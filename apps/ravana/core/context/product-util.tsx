import { createContext, useContext } from 'react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

export type IProductUtilListContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: any;
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
	apiKey: string;
	totalCount: number;
};

export const ProductUtilsListContext = createContext<IProductUtilListContextType | undefined>(
	undefined
);

export const useProductUtilsListContext = () => {
	const context = useContext(ProductUtilsListContext);
	if (!context) {
		throw new Error(
			'useProductUtilsListContext must be used within a ProductUtilsListContext.Provider'
		);
	}
	return context;
};
