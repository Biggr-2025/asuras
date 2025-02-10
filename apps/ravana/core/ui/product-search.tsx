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

import { useGetProductsList } from '../api';

export function ProductSearch({
	handleProduct,
	className,
	inputClasses,
}: {
	handleProduct: (product: ICatalougeTypes.IProduct) => void;
	className?: string;
	inputClasses?: string;
}) {
	const [searchValue, onSearchValueChange] = useState('');
	const [selectedValue, onSelectedValueChange] = useState<ICatalougeTypes.IProduct | null>(null);
	const [open, setOpen] = useState(false);
	const { data, isPending } = useGetProductsList(searchValue, 'products/search', 1, 0, 10, 0);
	const productsData = data?.data?.products || ([] as ICatalougeTypes.IProduct[]);

	const onSelect = async (product: ICatalougeTypes.IProduct) => {
		onSelectedValueChange(product);
		await handleProduct(product);
		setOpen(false);
	};

	return (
		<AutoSearch
			placeholder="Search for Products..."
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
				{productsData.length > 0 && !isPending && (
					<CommandGroup>
						{productsData.map((product) => {
							return (
								<CommandItem onSelect={() => onSelect(product)} key={product._id}>
									<Check
										className={cn(
											selectedValue?.productId === product.productId
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									<span className="text-14 font-medium">{product.title}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>
				)}
				{!isPending && <CommandEmpty>No Products found.</CommandEmpty>}
			</CommandList>
		</AutoSearch>
	);
}
