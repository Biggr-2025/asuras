import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import {
	ColumnDef,
	flexRender,
	HeaderGroup,
	Row,
	Table as TanstackTable,
} from '@tanstack/react-table';

import { IProduct } from '../../../../../../types';

export default function ProductTable({
	table,
	columns,
	isFetching,
}: {
	table: TanstackTable<IProduct>;
	columns: ColumnDef<IProduct>[];
	isFetching: boolean;
}) {
	return (
		<div className="shadow-card1 rounded-8 bg-white p-12">
			<Table>
				<TableHeader>
					{table?.getHeaderGroups().map((headerGroup: HeaderGroup<IProduct>) => (
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
						table.getRowModel().rows.map((row: Row<IProduct>) => {
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
}
