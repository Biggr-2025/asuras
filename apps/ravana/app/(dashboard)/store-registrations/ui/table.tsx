'use client';

import { useEffect, useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@asuras/ui';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { updateStatusAction } from '../api/update-status';

export default function StoreRegistration({ data }: { data: IStoreTypes.IStoreRegistration[] }) {
	const { execute, result, isExecuting } = useAction(updateStatusAction);
	const columns: ColumnDef<IStoreTypes.IStoreRegistration>[] = useMemo(
		() => [
			{
				accessorKey: 'storeName',
				header: 'Store Name',
				cell: ({ row }) => <div>{row.getValue('storeName')}</div>,
			},
			{
				accessorKey: 'storeLocation',
				header: 'Store Location',
				cell: ({ row }) => <div>{row.getValue('storeLocation')}</div>,
			},
			{
				accessorKey: 'companyName',
				header: 'Company Name',
				cell: ({ row }) => <div>{row.getValue('companyName')}</div>,
			},
			{
				accessorKey: 'gstNo',
				header: 'GST No',
				cell: ({ row }) => <div>{row.getValue('gstNo')}</div>,
			},
			{
				accessorKey: 'ownerName',
				header: 'Owner Name',
				cell: ({ row }) => <div>{row.getValue('ownerName')}</div>,
			},
			{
				accessorKey: 'ownerContact',
				header: 'Owner Contact',
				cell: ({ row }) => <div>{row.getValue('ownerContact')}</div>,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }) => (
					<Select
						value={row.getValue('status')}
						onValueChange={(newStatus: IStoreTypes.IStatus) => {
							execute({ id: row.original.id, status: newStatus });
						}}
						disabled={isExecuting}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PROCESSING">Processing</SelectItem>
							<SelectItem value="HOLD">Hold</SelectItem>
							<SelectItem value="SUCCESS">Success</SelectItem>
							<SelectItem value="FAILED">Failed</SelectItem>
						</SelectContent>
					</Select>
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		if (result.data?.status === 200) {
			toast.success(result.data.msg);
		}
	}, [result]);

	return (
		<div>
			<Table className="rounded-12 shadow-card1 relative m-16 bg-white">
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
					{table?.getRowModel()?.rows.length ? (
						table.getRowModel().rows.map((row) => {
							return (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="text-14" key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="text-center">
								No results found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
