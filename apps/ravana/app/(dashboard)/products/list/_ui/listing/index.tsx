import { ReactNode, useCallback, useMemo, useState } from 'react';
import { cn } from '@asuras/utils';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

import { useGetProductsList } from '../../../../../../core/api';
import { ProductListingContext } from '../../_context';

interface IProductListingProps {
	children: ReactNode;
	showInactive: 0 | 1;
	apiKey: string;
	className?: string;
}

export function ProductListing({ children, apiKey, className }: IProductListingProps) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const [search, setSearchTerm] = useState('');
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
			setPagination({ ...pagination, pageIndex: 0 });
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
