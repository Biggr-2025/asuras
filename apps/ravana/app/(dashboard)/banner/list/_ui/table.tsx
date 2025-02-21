import {
	Button,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@asuras/ui';
import { flexRender, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { IBanner } from '../../../../../types';
import { getColumns } from './columns';

export default function ListingTable({
	data,
	isLoading,
	pagination,
	setPagination,
}: {
	data: IBanner[];
	isLoading: boolean;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
}) {
	const columns = getColumns();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	if (isLoading) {
		return (
			<div className="my-54">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="p-16">
			<Table className="relative">
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
					{table?.getRowModel()?.rows?.length ? (
						table?.getRowModel()?.rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell className="text-14 px-16" key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 py-24 text-center">
								<span>No results found.</span>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex items-center justify-end gap-12 border-t p-16">
				<Button
					disabled={pagination.pageIndex === 0}
					onClick={() =>
						setPagination({
							...pagination,
							pageIndex: pagination.pageIndex - 1,
						})
					}
					size="lg"
				>
					<ChevronLeft />
					<span className="text-14 font-medium">Previous</span>
				</Button>
				<Button
					disabled={data.length < pagination.pageSize}
					onClick={() =>
						setPagination({
							...pagination,
							pageIndex: pagination.pageIndex + 1,
						})
					}
					size="lg"
					className="py-12"
				>
					<span className="text-14 font-medium">Next</span>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}
