import { ColumnDef, Row } from '@tanstack/react-table';

import { IStatus, IStoreRegistration } from '../../../../types';
import StatusDropdown from './dropdown';

export function getColumns(
	execute: (payload: { id: number; status: IStatus }) => void,
	isExecuting: boolean
): ColumnDef<IStoreRegistration>[] {
	return [
		{
			accessorKey: 'storeName',
			header: 'Store Name',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<div>{row.original.storeName}</div>
			),
		},
		{
			accessorKey: 'storeLocation',
			header: 'Store Location',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<div>{row.original.storeLocation}</div>
			),
		},
		{
			accessorKey: 'companyName',
			header: 'Company Name',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<div>{row.original.companyName}</div>
			),
		},
		{
			accessorKey: 'gstNo',
			header: 'GST No',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => <div>{row.original.gstNo}</div>,
		},
		{
			accessorKey: 'ownerName',
			header: 'Owner Name',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<div>{row.original.ownerName}</div>
			),
		},
		{
			accessorKey: 'ownerContact',
			header: 'Owner Contact',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<div>{row.original.ownerContact}</div>
			),
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }: { row: Row<IStoreRegistration> }) => (
				<StatusDropdown
					status={row.original.status}
					id={row.original.id}
					execute={execute}
					isExecuting={isExecuting}
				/>
			),
		},
	];
}
