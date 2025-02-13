import { useMemo } from 'react';
import { cn } from '@asuras/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../core/primitives';
import { ProductUtilsTable } from '../../../../core/ui/product-util/table';

export default function ColumnsListing({ type }: { type: string }) {
	const columns: ColumnDef<ICatalougeTypes.ICategory>[] = useMemo(() => {
		const baseColumns: ColumnDef<ICatalougeTypes.ICategory>[] = [
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
				const status = row.getValue('active');
				return (
					<div className="flex items-center gap-12">
						<div
							className={cn(
								'!text-12 inline-block rounded-full px-12 py-4 !font-semibold',
								status ? 'bg-primary text-white' : 'bg-red-1 text-white'
							)}
						>
							{status ? 'Active' : 'Inactive'}
						</div>
						{/* <AlertDialog>
							<AlertDialogTrigger asChild>
								<Button size="icon" variant="ghost">
									<PencilIcon className="!size-16" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent className="gap-24">
								<AlertDialogHeader>
									<AlertDialogTitle className="text-24">
										Update Status?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to update the status.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="!pt-32">
									<AlertDialogCancel>
										<span className="text-14 font-normal">Cancel</span>
									</AlertDialogCancel>
									<AlertDialogAction
									// onClick={() => handleDeleteProduct(row.original.productId)}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog> */}
					</div>
				);
			},
		});

		return baseColumns;
	}, [type]);

	return <ProductUtilsTable columns={columns} />;
}
