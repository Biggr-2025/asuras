import { PaginationWithLinks } from '@asuras/ui';
import { PaginationState } from '@tanstack/react-table';

export default function ProductPagination({
	pagination,
	totalCount,
	handlePagination,
}: {
	pagination: PaginationState;
	totalCount: number;
	handlePagination: (type: 'prev' | 'next' | number) => void;
}) {
	return (
		<div className="rounded-8 shadow-card1 mt-12 flex items-center justify-between gap-24 bg-white p-16">
			<div className="flex-1">
				Showing Results: {pagination.pageIndex * pagination.pageSize + 1}-
				{Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} of{' '}
				{totalCount}
			</div>
			<PaginationWithLinks
				page={pagination.pageIndex}
				pageSize={pagination.pageSize}
				totalCount={totalCount}
				handlePagination={handlePagination}
				className="flex flex-1 items-center justify-end gap-12"
			/>
		</div>
	);
}
