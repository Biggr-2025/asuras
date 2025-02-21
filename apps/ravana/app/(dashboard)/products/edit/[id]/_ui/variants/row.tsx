import { TableCell, TableRow } from '@asuras/ui';
import { flexRender, Row } from '@tanstack/react-table';

import { IProduct } from '../../../../../../../types';

export default function VariantTableRow({ row }: { row: Row<IProduct> }) {
	return (
		<TableRow key={row.id}>
			{row.getVisibleCells().map((cell) => (
				<TableCell className="text-14 px-16" key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
}
