import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../core/primitives';
import { ProductUtilsTable } from '../../../../core/ui/product-util/table';
import { ICategory } from '../../../../types';
import Status from './active';

export default function ColumnsListing({ type }: { type: string }) {
	const columns: ColumnDef<ICategory>[] = useMemo(() => {
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
						href={`${Routes.EditUtils}/${type}/${row.original.name}`}
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
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-12">
						<Status row={row.original} type={type} />
					</div>
				);
			},
		});

		return baseColumns;
	}, [type]);

	return <ProductUtilsTable columns={columns} />;
}
