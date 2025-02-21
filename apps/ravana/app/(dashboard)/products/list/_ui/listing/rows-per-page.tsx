import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@asuras/ui';

import { useProductListingContext } from '../../_context';

export default function RowsPerPageSelect() {
	const { pagination, setPagination } = useProductListingContext();

	const handleRowChange = (newRow: string) => {
		setPagination({ pageIndex: 0, pageSize: Number(newRow) });
	};

	return (
		<div className="flex items-center gap-4">
			<span className="whitespace-nowrap text-sm">Rows per page:</span>
			<Select value={pagination.pageSize.toString()} onValueChange={handleRowChange}>
				<SelectTrigger className="h-40 max-w-[80px] py-0">
					<SelectValue>{String(pagination.pageSize)}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{[15, 30, 50].map((option) => (
						<SelectItem key={option} value={String(option)}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
