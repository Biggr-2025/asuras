import React, { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';

import { IStoreProducts } from '../../../../../../../../types';
import { useStoreProductsListingContext } from '../listing/_context';
import { getColumns } from './columns';
import { Pagination } from './pagination';
import { ProductTable } from './table';

export const StoreProductTable = () => {
	const columns: ColumnDef<IStoreProducts>[] = useMemo(() => getColumns(), []);
	const { data, isFetching, rowSelection, setRowSelection, pagination, setPagination } =
		useStoreProductsListingContext();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data: data as IStoreProducts[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (newRowSelection: any) => setRowSelection(newRowSelection),
		// getRowId: (row) => row._id,
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
			<ProductTable table={table} isFetching={isFetching} />
			<Pagination
				pagination={pagination}
				setPagination={setPagination}
				dataLength={data?.length}
			/>
		</>
	);
};
