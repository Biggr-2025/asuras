import { ColumnDef } from '@tanstack/react-table';

import { RowDragHandleCell } from './row-drag';

export const columns: ColumnDef<{ id: string; name: string }>[] = [
	{
		id: 'drag-handle',
		header: '',
		cell: ({ row }) => <RowDragHandleCell rowId={row.original.id} />,
		size: 60,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div>{row.getValue('name')}</div>,
	},
];
