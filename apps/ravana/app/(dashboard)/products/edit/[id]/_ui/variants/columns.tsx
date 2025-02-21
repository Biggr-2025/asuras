import { original } from '@reduxjs/toolkit';
import { ColumnDef } from '@tanstack/react-table';

import VariantDeleteDialog from './delete-dialog';

export function getColumns(
	ids: string[],
	updateProductVariants: (payload: { productVariantIds: string[] }) => Promise<any>,
	refetch: () => void
): ColumnDef<ICatalougeTypes.IProduct>[] {
	return [
		{
			accessorKey: 'title',
			header: 'Title',
			cell: ({ row }) => <div>{row.getValue('title')}</div>,
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
			id: 'delete',
			header: '',
			cell: ({ row }) => {
				const handleDelete = async () => {
					const removeVariantId = ids.filter((id) => id !== row.original.productId);
					const response = await updateProductVariants({
						productVariantIds:
							removeVariantId.length === 0
								? [row.original.productId]
								: removeVariantId,
					});
					if (response.status === 'SUCCESS') {
						refetch();
					}
				};

				return <VariantDeleteDialog handleDelete={handleDelete} />;
			},
		},
	];
}
