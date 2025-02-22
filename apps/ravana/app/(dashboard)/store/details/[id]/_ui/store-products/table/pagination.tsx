import React from 'react';
import { Button } from '@asuras/ui';
import { PaginationState } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type IProps = {
	pagination: PaginationState;
	dataLength: number;
	setPagination: (state: PaginationState) => void;
};

export const Pagination = ({ pagination, setPagination, dataLength }: IProps) => {
	return (
		<div className="flex items-center justify-end gap-12 border-t p-16">
			<Button
				disabled={pagination.pageIndex === 0}
				onClick={() =>
					setPagination({
						...pagination,
						pageIndex: pagination.pageIndex - 1,
					})
				}
				size="lg"
			>
				<ChevronLeft />
				<span className="text-14 font-medium">Previous</span>
			</Button>
			<Button
				disabled={dataLength < pagination.pageSize}
				onClick={() =>
					setPagination({
						...pagination,
						pageIndex: pagination.pageIndex + 1,
					})
				}
				size="lg"
				className="py-12"
			>
				<span className="text-14 font-medium">Next</span>
				<ChevronRight />
			</Button>
		</div>
	);
};
