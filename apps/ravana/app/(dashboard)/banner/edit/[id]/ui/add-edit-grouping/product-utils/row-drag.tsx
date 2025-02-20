import { useSortable } from '@dnd-kit/sortable';
import { GrabIcon } from 'lucide-react';

export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners } = useSortable({
		id: rowId,
	});
	return (
		<button {...attributes} {...listeners}>
			<GrabIcon />
		</button>
	);
};
