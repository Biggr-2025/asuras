import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../../core/primitives';
import { IStore } from '../../../../../../types';

export function getColumns(): ColumnDef<IStore>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Store Name',
			cell: ({ row }) => {
				return (
					<Link
						className="hover:text-primary hover:underline"
						href={`${Routes.StoreDetails}/${row.original.userId}?type=details`}
					>
						{row.original.name}
					</Link>
				);
			},
		},
		{
			accessorKey: 'mobile',
			header: 'Mobile',
			cell: ({ row }) => <div>{row.getValue('mobile')}</div>,
		},
	];
}
