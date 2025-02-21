import { Tooltip, TooltipContent, TooltipTrigger } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../../core/primitives';

export function getColumns(): ColumnDef<ICatalougeTypes.IProduct>[] {
	return [
		{
			accessorKey: 'title',
			header: 'Title',
			cell: ({ row }) => {
				return (
					<Tooltip>
						<TooltipTrigger>
							<Link
								className="hover:text-primary line-clamp-2 w-[340px] text-left hover:underline"
								href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
							>
								{row.original.title}
							</Link>
						</TooltipTrigger>
						<TooltipContent className="border-grey-light rounded-8 border bg-white">
							<p className="text-black-1 text-14">{row.original.title}</p>
						</TooltipContent>
					</Tooltip>
				);
			},
			size: 200,
		},
		{
			accessorKey: 'category',
			header: 'Category',
			cell: ({ row }) => <div>{row.getValue('category')}</div>,
		},
		{
			accessorKey: 'subcategory',
			header: 'Sub Category',
			cell: ({ row }) => <div>{row.getValue('subcategory')}</div>,
		},
		{
			accessorKey: 'brand',
			header: 'Brand',
			cell: ({ row }) => <div>{row.getValue('brand')}</div>,
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
	];
}
