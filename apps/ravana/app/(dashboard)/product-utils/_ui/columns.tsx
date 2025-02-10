import { useMemo } from 'react';
import { cn } from '@asuras/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../core/primitives';
import { ProductUtilsTable } from '../../../../core/ui/product-util/table';

export default function ColumnsListing() {
	const columns: ColumnDef<ICatalougeTypes.ICategory>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				cell: ({ row }) => {
					return (
						<Link
							className="hover:text-primary line-clamp-2 w-[340px] text-left hover:underline"
							href={`${Routes.EditUtils}/DEPARTMENT/${row.original.name}`}
						>
							{row.original.name}
						</Link>
					);
				},
				size: 200,
			},
			{
				accessorKey: 'active',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.getValue('active');
					return (
						<div
							className={cn(
								'!text-12 inline-block rounded-full px-12 py-4 !font-semibold',
								status ? 'bg-primary text-white' : 'bg-red-1 text-white'
							)}
						>
							{status ? 'Active' : 'Inactive'}
						</div>
					);
				},
			},
		],
		[]
	);

	return <ProductUtilsTable columns={columns} />;
}
