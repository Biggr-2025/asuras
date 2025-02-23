import { ReactNode, useCallback, useMemo, useState } from 'react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

import { useGetProductUtilsList } from '../../_api/get-product-utils';
import { ProductUtilsListContext } from '../../_context';

export function ProductUtilList({
	children,
	apiKey,
	type,
}: {
	children: ReactNode;
	apiKey: string;
	type: string;
	active: 0 | 1;
	count: 0 | 1;
}) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: Number(page) || 0,
		pageSize: 15,
	});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const { data, isPending, refetch } = useGetProductUtilsList({
		apiKey: 'productUtil/list',
		utilType: type,
		searchTerm: search,
		active: 0,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
		count: 1,
	});

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

	const value = useMemo(() => {
		return {
			value: search,
			handleSearchChange,
			data: data?.data?.list || [],
			isFetching: isPending,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			apiKey,
			totalCount: data?.data?.totalCount || 0,
		};
	}, [
		apiKey,
		data?.data?.list,
		data?.data?.totalCount,
		handleSearchChange,
		isPending,
		pagination,
		refetch,
		rowSelection,
		search,
	]);

	return (
		<ProductUtilsListContext.Provider value={value}>
			{children}
		</ProductUtilsListContext.Provider>
	);
}
