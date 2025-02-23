import { ReactNode, useCallback, useMemo, useState } from 'react';
import { cn } from '@asuras/utils';
import { PaginationState } from '@tanstack/react-table';

import { useGetStoresProductsList } from '../_api/get-store-products';
import { StoreProductsListingContext } from '../_context';

interface IStoreProductsListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	storeId: string;
	className?: string;
}

export function StoreProductsListing({
	children,
	apiKey,
	storeId,
	className,
}: IStoreProductsListingProps) {
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isFetching, refetch } = useGetStoresProductsList({
		searchTerm: search,
		apiKey,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
		storeId,
	});
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
