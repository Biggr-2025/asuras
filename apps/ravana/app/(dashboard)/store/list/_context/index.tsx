import { createContext, useContext } from 'react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';

import { IStore } from '../../../../../types';

export type IStoreListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: IStore[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
};

export const StoreListingContext = createContext<IStoreListingContextType | undefined>(undefined);

export const useStoreListingContext = () => {
	const context = useContext(StoreListingContext);
	if (!context) {
		throw new Error(
			'useStoreListingContext must be used within a StoreListingContext.Provider'
		);
	}
	return context;
};
