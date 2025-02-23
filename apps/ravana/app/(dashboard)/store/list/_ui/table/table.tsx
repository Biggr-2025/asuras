import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import { ColumnDef, flexRender, Table as TanstackTable } from '@tanstack/react-table';

import { IStore } from '../../../../../../types';

export function StoreTable({
	table,
	isFetching,
	columns,
}: {
	table: TanstackTable<IStore>;
	isFetching: boolean;
	columns: ColumnDef<IStore>[];
}) {
	return (
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
									<TableCell className="text-14" key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
	);
}
