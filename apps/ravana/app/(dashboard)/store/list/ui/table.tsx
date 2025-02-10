import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Routes } from '../../../../../core/primitives';
import { StoreListingTable } from '../../../../../core/ui';

export default function ColumnsListing() {
	const params = useParams();

	const columns: ColumnDef<ICatalougeTypes.IStore>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Store Name',
				cell: ({ row }) => {
					return (
						<Link
							className="hover:text-primary hover:underline"
							href={`${Routes.StoreDetails}/${row.original.userId}?type=details`}
						>
							{row.original.name}
						</Link>
					);
				},
			},
			{
				accessorKey: 'mobile',
				header: 'Mobile',
				cell: ({ row }) => <div>{row.getValue('mobile')}</div>,
			},
		],
		[]
	);

	return <StoreListingTable columns={columns} id={params?.id as string} />;
}
