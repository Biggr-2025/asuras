/* eslint-disable max-lines-per-function */
import { useMemo } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@asuras/ui';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';

import { useGetProductsByIds } from '../../../../../../../core/api';
import { useUpdateProductVariants } from '../../api';

export default function VariantListing({
	ids,
	refetch,
	productId,
}: {
	ids: string[];
	refetch: () => void;
	productId: string;
}) {
	const { data, isLoading } = useGetProductsByIds(ids.join(','));
	const products = data?.data?.products || [];
	const { mutateAsync: updateProductVariants } = useUpdateProductVariants(productId);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
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
							productVariantIds: removeVariantId,
						});
						if (response.status === 'SUCCESS') {
							refetch();
						}
					};

					return (
						<AlertDialog>
							<AlertDialogTrigger
								className="flex w-full items-center gap-12 py-12"
								asChild
							>
								<Button size="icon" variant="ghost">
									<Trash2Icon className="!size-18 text-red-1" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent className="gap-24">
								<AlertDialogHeader>
									<AlertDialogTitle className="text-24">
										Remove Variant?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to remove this variant from the
										product.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="!pt-32">
									<AlertDialogCancel>
										<span className="text-14 font-normal">Cancel</span>
									</AlertDialogCancel>
									<AlertDialogAction onClick={handleDelete}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					);
				},
			},
		],
		[]
	);

	const table = useReactTable({
		data: products as ICatalougeTypes.IProduct[],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Table className="relative">
			<TableHeader>
				{table?.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead className="text-14 p-16" key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{products.length > 0 && table?.getRowModel()?.rows?.length ? (
					table?.getRowModel()?.rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="text-14 px-16" key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 py-24 text-center">
							<span>No variants found.</span>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
