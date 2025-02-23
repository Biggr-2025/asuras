import React from 'react';
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import { ColumnDef, flexRender, Table as TanstackTable } from '@tanstack/react-table';

import { ICategory } from '../../../../../types';

export const UtilsTable = ({
	table,
	isFetching,
	columns,
}: {
	table: TanstackTable<ICategory>;
	isFetching: boolean;
	columns: ColumnDef<ICategory>[];
}) => {
	return (
		<div className="rounded-8 shadow-card1 bg-white px-16">
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
	);
};
