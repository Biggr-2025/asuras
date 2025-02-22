import { createContext, useContext } from 'react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { IStoreProducts } from '../../../../../../../../../types';

export type IStoreProductsListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: IStoreProducts[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
	storeId: string;
};

export const StoreProductsListingContext = createContext<
	IStoreProductsListingContextType | undefined
>(undefined);

export const useStoreProductsListingContext = () => {
	const context = useContext(StoreProductsListingContext);
	if (!context) {
		throw new Error(
			'useStoreProductsListingContext must be used within a StoreProductsListingContext.Provider'
		);
	}
	return context;
};
