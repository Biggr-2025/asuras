import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { IProduct } from '../../../../../../../types';
import VariantTableRow from './row';

export default function VariantTable({
	products,
	columns,
}: {
	products: IProduct[];
	columns: ColumnDef<IProduct>[];
}) {
	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table className="relative">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
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
				{products.length > 0 ? (
					table
						.getRowModel()
						.rows.map((row) => <VariantTableRow key={row.id} row={row} />)
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 py-24 text-center">
							<span>No variants found.</span>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
