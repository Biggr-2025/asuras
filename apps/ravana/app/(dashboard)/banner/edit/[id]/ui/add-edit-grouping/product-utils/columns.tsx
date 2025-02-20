/* eslint-disable indent */
/* eslint-disable prettier/prettier */
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
} from '@asuras/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';

import { RowDragHandleCell } from './row-drag';

interface TableColumnsProps {
	updateGroupItems: any;
	isPending: boolean;
	activeId: string;
	tableData: { id: string; name: string }[];
	groupKey: string;
	refetch: () => void;
}

export const tableColumns = ({
	updateGroupItems,
	isPending,
	activeId,
	tableData,
	groupKey,
	refetch,
}: TableColumnsProps): ColumnDef<{ id: string; name: string }>[] => [
	{
		id: 'drag-handle',
		header: '',
		cell: ({ row }) => <RowDragHandleCell rowId={row.original.id} />,
		size: 60,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const name = row.getValue('name') as string;
			return <div>{name}</div>;
		},
	},
	{
		id: 'delete',
		header: '',
		cell: ({ row }) => {
			const handleDelete = async () => {
				const data = tableData.map((table) => table.name);
				const filterData = data.filter((name) => name !== row.original.name);
				const payload = {
					[groupKey]: filterData,
					bannerGroupId: activeId,
				};
				const response = await updateGroupItems(payload);
				if (response.status === 'SUCCESS') {
					refetch();
				}
			};

			return (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button disabled={isPending} size="icon" variant="ghost">
							<Trash2Icon className="!size-18 text-red-1" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-24">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-24">Remove Product?</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to remove this product.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-32">
							<AlertDialogCancel>
								<span className="text-14 font-normal">Cancel</span>
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);
		},
	},
];
