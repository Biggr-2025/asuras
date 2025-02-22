import { ReactNode, useCallback, useMemo, useState } from 'react';
import { cn } from '@asuras/utils';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { useGetStoresList } from '../../../_api/get-stores-list';
import { StoreListingContext } from '../../_context';

interface IStoreListingProps {
	children: ReactNode;
	apiKey: string;
	className?: string;
}

export function StoreListing({ children, apiKey, className }: IStoreListingProps) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const [search, setSearchTerm] = useState<string>('');
	const { data, isFetching, refetch } = useGetStoresList({
		searchTerm: search,
		apiKey,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
	});
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
			data: data?.data?.stores || [],
			isFetching,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
		}),
		[
			data?.data?.stores,
			handleSearchChange,
			isFetching,
			pagination,
			refetch,
			rowSelection,
			search,
		]
	);

	return (
		<StoreListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</StoreListingContext.Provider>
	);
}
