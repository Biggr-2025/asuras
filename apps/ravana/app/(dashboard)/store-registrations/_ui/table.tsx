'use client';

import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { IStoreRegistration } from '../../../../types';
import { updateStatusAction } from '../_api/update-status';
import { getColumns } from './columns';

export default function StoreRegistration({ data }: { data: IStoreRegistration[] }) {
	const { execute, result, isExecuting } = useAction(updateStatusAction);
	const columns = getColumns(execute, isExecuting);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		if (result.data?.status === 200) {
			toast.success(result.data.msg);
		}
	}, [result]);

	return (
		<div className="overflow-hidden">
			<Table className="rounded-12 shadow-card1 relative m-16 bg-white">
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
					{table?.getRowModel()?.rows.length ? (
						table.getRowModel().rows.map((row) => {
							return (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="text-14" key={cell.id}>
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
	);
}
