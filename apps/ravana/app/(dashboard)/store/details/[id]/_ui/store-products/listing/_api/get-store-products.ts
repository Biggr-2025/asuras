import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../../../../core/services';
import { IApiResponse, IStoreProducts } from '../../../../../../../../../types';

interface IProps {
	searchTerm: string;
	apiKey: string;
	page: number;
	limit: number;
	storeId: string;
}

const getStoresProductsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, number, string]>) => {
	const [_key, searchTerm, limit, page, storeId] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/store/productList?page=${page}&limit=${limit}&storeId=${storeId}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
	}

	const { data } = await HttpService.get<IApiResponse<{ storeProducts: IStoreProducts[] }>>(url);
	return data;
};

export function useGetStoresProductsList({ searchTerm, apiKey, page, limit, storeId }: IProps) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, page, storeId],
		queryFn: getStoresProductsList,
		placeholderData: keepPreviousData,
	});
}
