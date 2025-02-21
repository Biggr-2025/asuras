'use client';
import { useState } from 'react';
import {
	AutoSearch,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	Skeleton,
} from '@asuras/ui';
import { cn } from '@asuras/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';

import { ICategory } from '../../types/catalouge';
import { useGetProductUtilsList } from '../api/app-utils/product-utils';

export function UtilsSearch({
	handleUtil,
	className,
	inputClasses,
	type,
}: {
	handleUtil: (product: ICategory) => void;
	className?: string;
	inputClasses?: string;
	type: string;
}) {
	const [searchValue, onSearchValueChange] = useState('');
	const [selectedValue, onSelectedValueChange] = useState<ICategory | null>(null);
	const [open, setOpen] = useState(false);
	const { data, isPending } = useGetProductUtilsList({
		apiKey: 'productUtil/list',
		utilType: type,
		searchTerm: searchValue,
		active: 1,
		page: 0,
		limit: 30,
		count: 1,
	});

	const onSelect = async (product: ICategory) => {
		onSelectedValueChange(product);
		await handleUtil(product);
		setOpen(false);
	};

	return (
		<AutoSearch
			placeholder="Search ..."
			searchValue={searchValue}
			onSearchValueChange={onSearchValueChange}
			open={open}
			setOpen={setOpen}
			className={cn('max-w-[520px]', className)}
			inputClasses={inputClasses}
		>
			<CommandList>
				{isPending && (
					<CommandPrimitive.Loading>
						<div className="px-12 py-8">
							<Skeleton className="h-24 w-full" />
						</div>
					</CommandPrimitive.Loading>
				)}
				{data && data?.data?.list?.length > 0 && !isPending && (
					<CommandGroup>
						{data?.data?.list.map((product) => {
							return (
								<CommandItem onSelect={() => onSelect(product)} key={product._id}>
									<Check
										className={cn(
											selectedValue?.name === product.name
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									<span className="text-14 font-medium">{product.name}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>
				)}
				{!isPending && <CommandEmpty>Nothing found.</CommandEmpty>}
			</CommandList>
		</AutoSearch>
	);
}
