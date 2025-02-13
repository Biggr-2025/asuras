'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@asuras/ui';
import { cn } from '@asuras/utils';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useGetProductsList } from '../../api/catalouge/get-products-list';
import { ProductListingContext, useProductListingContext } from './context';

interface IProductListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	className?: string;
}

export function ProductListing({
	children,
	showInactive,
	apiKey,
	className,
}: IProductListingProps) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const [search, setSearchTerm] = useState<string>('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: Number(page) || 0,
		pageSize: 15,
	});
	const [active, setActive] = useState<0 | 1>(0);
	const { data, isFetching, refetch } = useGetProductsList(
		search,
		apiKey,
		active,
		pagination.pageIndex,
		pagination.pageSize,
		1
	);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchTerm(value);
			setPagination({
				...pagination,
				pageIndex: 0,
			});
		},
		[pagination]
	);

	const value = useMemo(
		() => ({
			value: search,
			handleSearchChange,
			data: data?.data?.products || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			apiKey,
			totalCount: data?.data?.totalCount || 0,
			active,
			setActive,
		}),
		[
			active,
			apiKey,
			data?.data?.products,
			data?.data?.totalCount,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
		]
	);

	return (
		<ProductListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</ProductListingContext.Provider>
	);
}

interface IProductListingHeaderProps {
	className?: string;
	children?: ReactNode;
}

export const ProductListingHeader = ({ className }: IProductListingHeaderProps) => {
	const { value, handleSearchChange, pagination, setPagination, active, setActive } =
		useProductListingContext();

	const handleRowChange = (newRow: string) => {
		setPagination({
			pageIndex: 0,
			pageSize: Number(newRow),
		});
	};

	const toggleActive = () => {
		setActive(active === 1 ? 0 : 1);
		setPagination({
			...pagination,
			pageIndex: 0,
		});
	};

	return (
		<div className="shadow-card1 rounded-8 mb-12 bg-white">
			<div className={cn('flex items-center justify-between p-12', className)}>
				<div className="flex-1">
					<div className="relative flex w-[320px] items-center border-b px-12">
						<Search className="mr-12 size-16 shrink-0 opacity-50" />
						<Input
							className={cn(
								'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50',
								className
							)}
							type="search"
							placeholder="Search for products..."
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleSearchChange(e.target.value)
							}
						/>
						{value.length > 0 && (
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
								onClick={() => handleSearchChange('')}
							>
								<X className="text-red-1 !size-16" />
							</Button>
						)}
					</div>
				</div>
				<div className="flex flex-1 items-center justify-end gap-16">
					<Button onClick={toggleActive} variant="outline" size="sm" className="px-12">
						<span className="font-medium">Show {active === 1 ? 'All' : 'Active'}</span>
					</Button>
					<div className="flex items-center gap-4">
						<span className="whitespace-nowrap text-sm">Rows per page: </span>
						<Select
							value={pagination.pageSize.toString()}
							onValueChange={(value) => handleRowChange(value)}
						>
							<SelectTrigger className="h-40 max-w-[80px] py-0">
								<SelectValue placeholder="Select page size">
									{String(pagination.pageSize)}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{[15, 30, 50].map((option) => (
									<SelectItem key={option} value={String(option)}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

interface IProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const ProductListingContent = ({
	children,
	className,
	...props
}: IProductListingContentProps) => {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	);
};
