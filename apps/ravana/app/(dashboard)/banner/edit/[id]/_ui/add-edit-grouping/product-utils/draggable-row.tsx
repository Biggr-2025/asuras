import { CSSProperties } from 'react';
import { TableCell, TableRow } from '@asuras/ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row } from '@tanstack/react-table';

export const DraggableRow = ({ row }: { row: Row<{ id: string; name: string }> }) => {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.name,
	});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	};

	return (
		<TableRow key={row.id} ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};
