import { useEffect, useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IProduct } from '../../../../../../types';
import { useProductListingContext } from '../../_context';
import { getColumns } from './columns';
import ProductPagination from './pagination';
import ProductTable from './table';

export default function ListingTable() {
	const columns: ColumnDef<IProduct>[] = useMemo(() => getColumns(), []);
	const {
		data,
		isFetching,
		rowSelection,
		setRowSelection,
		pagination,
		setPagination,
		totalCount,
	} = useProductListingContext();
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
		getRowId: (row) => row.productId,
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
			<ProductTable table={table} columns={columns} isFetching={isFetching} />
			<ProductPagination
				pagination={pagination}
				totalCount={totalCount}
				handlePagination={handlePagination}
			/>
		</>
	);
}
