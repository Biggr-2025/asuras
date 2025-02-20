import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@asuras/ui';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { useUpdateBannerGroupProducts } from '../../../api/update-banner-group-products';
import { tableColumns } from './columns';
import { DraggableRow } from './draggable-row';
import { IBannerGroup } from './index';

export const TableComponent = ({
	tableData,
	rowIds,
	bannerId,
	activeId,
	groupKey,
	refetch,
}: {
	tableData: { id: string; name: string }[];
	rowIds: string[];
	bannerId: string;
	activeId: string;
	groupKey: keyof IBannerGroup;
	refetch: () => void;
}) => {
	const { mutateAsync: updateGroupItems, isPending } = useUpdateBannerGroupProducts(bannerId);
	const columns = tableColumns({
		updateGroupItems,
		isPending,
		activeId,
		tableData,
		groupKey,
		refetch,
	});

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.name,
	});

	return (
		<Table className="relative">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
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
				<SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
					{table.getRowModel().rows.length > 0 ? (
						table
							.getRowModel()
							.rows.map((row) => <DraggableRow key={row.id} row={row} />)
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 py-24 text-center">
								<span>No products found.</span>
							</TableCell>
						</TableRow>
					)}
				</SortableContext>
			</TableBody>
		</Table>
	);
};
