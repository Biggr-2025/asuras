'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';

import { IStore } from '../../../../../../types';
import { useStoreListingContext } from '../../_context';
import { getColumns } from './columns';
import { Pagintaion } from './pagaintaion';
import { StoreTable } from './table';

export function StoreListingTable() {
	const { data, isFetching, rowSelection, setRowSelection, pagination, setPagination } =
		useStoreListingContext();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const columns: ColumnDef<IStore>[] = useMemo(() => getColumns(), []);

	const table = useReactTable({
		data: data as IStore[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (newRowSelection: any) => setRowSelection(newRowSelection),
		getRowId: (row) => row._id,
		state: {
			columnVisibility,
			rowSelection,
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	return (
		<>
			<StoreTable table={table} isFetching={isFetching} />
			<Pagintaion
				setPagination={setPagination}
				pagination={pagination}
				dataLength={data?.length}
			/>
		</>
	);
}
