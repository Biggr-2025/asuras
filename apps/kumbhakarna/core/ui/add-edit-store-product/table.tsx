import { useMemo } from 'react';
import { Checkbox } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useAnalytics } from '../../context';
import { Routes } from '../../primitives';
import { ProductListingTable } from '../listing-tables/product-listing-table';

export default function ProductListTable({
	setRowSelection,
}: {
	setRowSelection: (state: RowSelectionState) => void;
}) {
	const { trackEvent } = useAnalytics();
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'select',
				header: '',
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => {
							if (value) {
								setRowSelection({ [row.original.productId]: true });
							} else {
								setRowSelection({});
							}
						}}
						aria-label="Select row"
					/>
				),
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					const handleEvents = async () => {
						await trackEvent('EDIT_CATALOUGE_PRODUCT', {
							path: `${Routes.EditStoreProduct}/${row.original.productId}?type=product`,
							productId: row.original.productId,
						});
					};

					return (
						<Link
							className="hover:text-primary hover:underline"
							href={`${Routes.EditStoreProduct}/${row.original.productId}?type=product`}
							onClick={handleEvents}
						>
							{row.original.title}
						</Link>
					);
				},
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => <div>{row.getValue('category')}</div>,
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

	return <ProductListingTable columns={columns} type="product-list" id={params?.id as string} />;
}
