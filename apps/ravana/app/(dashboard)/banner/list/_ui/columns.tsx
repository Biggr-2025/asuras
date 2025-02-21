import { ColumnDef, Row } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../core/primitives';
import { IBanner } from '../../../../../types';

export function getColumns(): ColumnDef<IBanner>[] {
	return [
		{
			accessorKey: 'rank',
			header: 'Rank',
			cell: ({ row }: { row: Row<IBanner> }) => <div>{row.original.rank}</div>,
		},
		{
			accessorKey: 'title',
			header: 'Title',
			cell: ({ row }: { row: Row<IBanner> }) => (
				<Link
					className="hover:text-primary hover:underline"
					href={`${Routes.EditBanner}/${row.original._id}?type=details`}
				>
					{row.original.title}
				</Link>
			),
		},
		{
			accessorKey: 'description',
			header: 'Description',
			cell: ({ row }: { row: Row<IBanner> }) => <div>{row.original.description}</div>,
		},
		{
			accessorKey: 'type',
			header: 'Type',
			cell: ({ row }: { row: Row<IBanner> }) => <div>{row.original.type}</div>,
		},
	];
}
