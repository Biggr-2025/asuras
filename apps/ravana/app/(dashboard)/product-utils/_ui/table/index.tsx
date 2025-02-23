import { useEffect, useState } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ICategory } from '../../../../../types';
import { useProductUtilsListContext } from '../../_context';
import { useColumns } from './columns';
import { Pagination } from './pagination';
import { UtilsTable } from './table';

export function ProductUtilsTable({ type }: { type: string }) {
	const columns: ColumnDef<ICategory>[] = useColumns(type);
	const {
		data,
		isFetching,
		rowSelection,
		setRowSelection,
		pagination,
		setPagination,
		totalCount,
	} = useProductUtilsListContext();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (newRowSelection: any) => setRowSelection(newRowSelection),
		state: {
			columnVisibility,
			rowSelection,
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (pagination.pageIndex > 0) {
			params.set('page', pagination.pageIndex.toString());
		} else {
			params.delete('page');
		}
		router.replace(`${pathname}?${params.toString()}`);
	}, [pagination.pageIndex, pathname, router, searchParams]);

	const handlePagination = (type: 'prev' | 'next' | number) => {
		if (type === 'prev') {
			setPagination({
				...pagination,
				pageIndex: pagination.pageIndex - 1,
			});
		} else if (type === 'next') {
			setPagination({
				...pagination,
				pageIndex: pagination.pageIndex + 1,
			});
		} else {
			setPagination({
				...pagination,
				pageIndex: type,
			});
		}
	};

	return (
		<>
			<UtilsTable table={table} isFetching={isFetching} columns={columns} />
			<Pagination
				totalCount={totalCount}
				pagination={pagination}
				handlePagination={handlePagination}
			/>
		</>
	);
}
