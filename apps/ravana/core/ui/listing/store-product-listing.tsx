'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Button, Input } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { PaginationState } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';

import { IProduct } from '../../../types/catalouge';
import { useGetStoresProductsList } from '../../api';
import { useCreateStoreProduct } from '../../api/catalouge/create-store-product';
import { ProductSearch } from '../product-search';
import { StoreProductsListingContext, useStoreProductsListingContext } from './context';

interface IStoreProductsListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	storeId: string;
	className?: string;
}

export function StoreProductsListing({
	children,
	showInactive,
	apiKey,
	storeId,
	className,
}: IStoreProductsListingProps) {
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isFetching, refetch } = useGetStoresProductsList(
		search,
		apiKey,
		showInactive,
		pagination.pageIndex,
		pagination.pageSize,
		storeId
	);
	const [rowSelection, setRowSelection] = useState({});

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
			data: data?.data?.storeProducts || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			storeId,
		}),
		[
			data?.data?.storeProducts,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
			storeId,
		]
	);

	return (
		<StoreProductsListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</StoreProductsListingContext.Provider>
	);
}

interface IStoreProductsListingHeaderProps {
	className?: string;
}

export const StoreProductsListingHeader = ({ className }: IStoreProductsListingHeaderProps) => {
	const { value, handleSearchChange, storeId, refetch } = useStoreProductsListingContext();
	const { mutateAsync: createStoreProduct } = useCreateStoreProduct();

	const handleProduct = async (product: IProduct) => {
		const payload = {
			storeId,
			productId: product?.productId,
			quantity: product?.quantity ? product?.quantity : 0,
			price: product?.price ? product?.price : 0,
			discount: 0,
			comment: '',
		};
		const response = await createStoreProduct(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className={cn('flex items-center justify-between gap-32 border-b p-12', className)}>
			<div className="flex-1">
				<div className="relative flex w-[520px] items-center border-b px-12">
					<Search className="mr-12 size-16 shrink-0 opacity-50" />
					<Input
						className={cn(
							'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50',
							className
						)}
						type="search"
						placeholder="Search for store products..."
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
			<div className="flex flex-1 justify-end">
				<ProductSearch handleProduct={handleProduct} />
			</div>
		</div>
	);
};

interface IStoreProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const StoreProductsListingContent = ({
	children,
	className,
	...props
}: IStoreProductListingContentProps) => {
	return (
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
