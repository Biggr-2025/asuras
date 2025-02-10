'use client';

import { useEffect, useState } from 'react';
import {
	PaginationWithLinks,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@asuras/ui';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useProductUtilsListContext } from '../../context/product-util';

export function ProductUtilsTable({ columns }: { columns: ColumnDef<any>[] }) {
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
			<div className="shadow-card1 rounded-8 bg-white">
				<Table>
					<TableHeader>
						{table?.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead className="text-14 p-16" key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isFetching ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="text-center">
									<Spinner />
									<span>Fetching new results...</span>
								</TableCell>
							</TableRow>
						) : table?.getRowModel()?.rows.length ? (
							table.getRowModel().rows.map((row) => {
								return (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="text-center">
									No results found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="rounded-8 shadow-card1 mt-12 flex items-center justify-between gap-24 bg-white p-16">
				<div className="flex-1">
					Showing Results: {pagination.pageIndex * pagination.pageSize + 1}-
					{Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} of{' '}
					{totalCount}
				</div>
				<PaginationWithLinks
					page={pagination.pageIndex}
					pageSize={pagination.pageSize}
					totalCount={totalCount}
					handlePagination={handlePagination}
					className="flex flex-1 items-center justify-end gap-12"
				/>
			</div>
		</>
	);
}
