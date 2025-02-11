/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
'use client';

import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@asuras/ui';
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	type UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

import { useGetProductsByIds } from '../../../../../../core/api';
import { Routes } from '../../../../../../core/primitives';
import { queryClient } from '../../../../../../core/services/providers';
import { ProductSearch } from '../../../../../../core/ui';
import { useGetBannerGroupDetails } from '../api/get-banner-group-details';
import { useUpdateBannerGroupProducts } from '../api/update-banner-group-products';

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners } = useSortable({
		id: rowId,
	});
	return (
		<button {...attributes} {...listeners}>
			🟰
		</button>
	);
};

const DraggableRow = ({ row }: { row: Row<ICatalougeTypes.IProduct> }) => {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.productId,
	});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	};

	return (
		<TableRow key={row.id} ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};

export default function ProductsList({
	bannerId,
	activeId,
}: {
	bannerId: string;
	activeId: string;
}) {
	const { data: bannerData, refetch } = useGetBannerGroupDetails(activeId, bannerId);
	const bannerImage = bannerData?.data?.group || ({} as ICatalougeTypes.IBannerImage);

	const { data } = useGetProductsByIds(bannerImage?.productIds?.join(','));
	const bannerProducts = useMemo(() => {
		return data?.data?.products;
	}, [data?.data?.products]);
	const { mutateAsync: updateGroupImageProducts, isPending } =
		useUpdateBannerGroupProducts(bannerId);
	const [products, setProducts] = useState<ICatalougeTypes.IProduct[]>([]);

	useEffect(() => {
		if (bannerProducts) {
			setProducts(bannerProducts);
		}
	}, [bannerProducts]);

	const handleDeleteProduct = useCallback(
		async (productId: string) => {
			//EXPLANATION:
			// const latestBannerData = queryClient.getQueryData(['banner/group', activeId, bannerId]) as
			// 	ICommonTypes.IApiResponse<{ group: ICatalougeTypes.IBannerImage }>
			// 	;
			// Explanation on why we are getting the data here, so when the function is created bannerdata is undefined at start and the handleDeleteProduct is also created at the same time so bannerdata is undefined at the function creationg time, so the function has bannerdata as undefined when you get the data so thats why we are getting the last fresh data

			const latestBannerData = queryClient.getQueryData([
				'banner/group',
				activeId,
				bannerId,
			]) as ICommonTypes.IApiResponse<{ group: ICatalougeTypes.IBannerImage }>;
			const productIds = latestBannerData?.data?.group?.productIds as string[];
			const removeBannerProduct = productIds?.filter((id) => id !== productId);
			const payload = {
				productIds: removeBannerProduct,
				bannerGroupId: activeId,
			};
			const response = await updateGroupImageProducts(payload);
			if (response.status === 'SUCCESS') {
				await queryClient.invalidateQueries({
					queryKey: ['banner/group', activeId, bannerId],
				});
				refetch();
			}
		},
		[activeId, bannerId, refetch, updateGroupImageProducts]
	);

	const columns: ColumnDef<ICatalougeTypes.IProduct>[] = useMemo(
		() => [
			{
				id: 'drag-handle',
				header: '',
				cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
				size: 60,
			},
			{
				accessorKey: 'title',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<Link
							className="hover:text-primary line-clamp-2 w-[340px] text-left hover:underline"
							href={`${Routes.EditProduct}/${row.original.productId}?type=product`}
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
				accessorKey: 'brand',
				header: 'Brand',
				cell: ({ row }) => <div>{row.getValue('brand')}</div>,
			},
			{
				id: 'select',
				header: '',
				cell: ({ row }) => {
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
										Remove Product?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to remove this product.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="!pt-32">
									<AlertDialogCancel>
										<span className="text-14 font-normal">Cancel</span>
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => handleDeleteProduct(row.original.productId)}
									>
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
		getRowId: (row) => row.productId,
		// debugTable: true,
		// debugHeaders: true,
		// debugColumns: true,
	});

	const handleProduct = async (product: ICatalougeTypes.IProduct) => {
		const payload = {
			productIds: [...bannerImage.productIds, product.productId],
			bannerGroupId: activeId,
		};
		const response = await updateGroupImageProducts(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const updateProductOrder = async () => {
		const ids = products.map((product) => product.productId);
		const payload = {
			productIds: ids,
			bannerGroupId: activeId,
		};
		console.log(ids);

		const response = await updateGroupImageProducts(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			// const oldIndex = productIds.indexOf(active.id)
			// const newIndex = productIds.indexOf(over.id)
			// const updatedProducts = arrayMove(products, oldIndex, newIndex);
			// setProducts(updatedProducts);
			setProducts((data) => {
				const oldIndex = productIds.indexOf(active.id);
				const newIndex = productIds.indexOf(over.id);
				return arrayMove(data, oldIndex, newIndex);
			});
		}
	}

	const productIds = useMemo<UniqueIdentifier[]>(
		() => products?.map(({ productId }) => productId),
		[products]
	);

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="rounded-12 bg-white">
				<div className="border-grey-light flex items-center justify-between border-b p-12">
					<Button disabled={isPending} loading={isPending} onClick={updateProductOrder}>
						<span>Update Order</span>
					</Button>
					<ProductSearch handleProduct={handleProduct} />
				</div>
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
						<SortableContext items={productIds} strategy={verticalListSortingStrategy}>
							{bannerProducts &&
							bannerProducts.length > 0 &&
							table?.getRowModel()?.rows.length > 0 ? (
								table?.getRowModel().rows.map((row) => {
									return <DraggableRow key={row.id} row={row} />;
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 py-24 text-center"
									>
										<span>No products found.</span>
									</TableCell>
								</TableRow>
							)}
						</SortableContext>
					</TableBody>
				</Table>
			</div>
		</DndContext>
	);
}
