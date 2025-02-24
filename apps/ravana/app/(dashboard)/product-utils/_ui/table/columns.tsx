import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../core/primitives';
import { ICategory } from '../../../../../types';
import Status from './active';

export function useColumns(type: string): ColumnDef<ICategory>[] {
	const columns = useMemo<ColumnDef<ICategory>[]>(() => {
		const baseColumns: ColumnDef<ICategory>[] = [
			{
				accessorKey: 'index',
				header: '#',
				cell: ({ row }) => row.index + 1,
				size: 50,
			},
			{
				accessorKey: 'name',
				header: 'Name',
				cell: ({ row }) => (
					<Link
						className="hover:text-primary line-clamp-2 text-left hover:underline"
						href={`${Routes.EditUtils}/${type}/${row.original._id}`}
					>
						{row.original.name}
					</Link>
				),
			},
		];

		if (type === 'CATEGORY') {
			baseColumns.push({
				accessorKey: 'department',
				header: 'Department',
				cell: ({ row }) => <div>{row.original.department}</div>,
			});
		}

		if (type === 'SUBCATEGORY') {
			baseColumns.push({
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => <div>{row.original.category}</div>,
			});
		}

		baseColumns.push({
			accessorKey: 'active',
			header: 'Status',
			cell: ({ row }) => (
				<div className="flex items-center gap-12">
					<Status row={row.original} type={type} />
				</div>
			),
		});

		return baseColumns;
	}, [type]);

	return columns;
}
