import { useMemo } from 'react';
import { cn } from '@asuras/utils';
import { ColumnDef } from '@tanstack/react-table';
import { PenIcon } from 'lucide-react';
import Link from 'next/link';

import { Routes } from '../../../../core/primitives';
import { useAppSelector } from '../../../../core/store';
import { StoreProductsListingTable } from '../../../../core/ui/listing-tables/store-products-listing';

export default function StoreProductsListTable() {
	// const { trackEvent } = useAnalytics();
	const auth = useAppSelector((state) => state.auth);

	const columns: ColumnDef<ICatalougeTypes.IStoreProducts>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<div className="line-clamp-2 w-[240px]">{row.original.product.title}</div>
					);
				},
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ row }) => {
					const cat = row.original.product.category.name;
					return <div>{cat}</div>;
				},
			},
			{
				accessorKey: 'price',
				header: 'Price',
				cell: ({ row }) => {
					const price = row.original.price;
					return <div className="text-14 font-bold">&#8377;{price}</div>;
				},
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				cell: ({ row }) => {
					const quantity = row.original.quantity;
					return <div className="text-14 font-bold">{quantity}</div>;
				},
			},
			{
				accessorKey: 'discount',
				header: 'Discount',
				cell: ({ row }) => {
					const discount = row.original.discount;
					return <div>{discount}</div>;
				},
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
			{
				accessorKey: 'status',
				header: 'Product Status',
				cell: ({ row }) => {
					const status = row.original.status;
					return (
						<div
							className={cn(
								'!text-12 inline-block rounded-full px-12 py-4 !font-semibold',
								status === 'ADDED' && 'bg-orange text-white',
								status === 'APPROVED' && 'bg-primary text-white',
								status === 'HOLD' && 'bg-red-1 text-white'
							)}
						>
							{status}
						</div>
					);
				},
			},
			{
				accessorKey: '',
				header: 'Actions',
				cell: ({ row }) => {
					// const handleEvents = async (link: string) => {
					// 	await trackEvent('UPDATE_STORE_PRODUCT', {
					// 		path: link,
					// 	});
					// };
					return (
						<div className="flex gap-12">
							<Link
								className="rounded-12 bg-secondary hover:bg-secondary/80 inline-flex items-center gap-6 px-12 py-8"
								href={`${Routes.EditStoreProduct}/${row.original.storeProductId}`}
								// onClick={() =>
								// 	handleEvents(
								// 		`${Routes.EditStoreProduct}/${row.original.storeProductId}`
								// 	)
								// }
							>
								<PenIcon className="size-16 text-white" />
								<span className="text-12 font-semibold text-white">
									Update Product
								</span>
							</Link>
						</div>
					);
				},
			},
		],
		[]
	);

	return <StoreProductsListingTable columns={columns} id={auth.userId as string} />;
}
