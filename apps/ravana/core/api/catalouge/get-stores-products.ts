import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { IApiResponse } from '../../../types';
import { HttpService } from '../../services';

const getStoresProductsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, 0 | 1, number, string]>) => {
	const [_key, searchTerm, limit, active, page, storeId] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/store/productList?page=${page}&limit=${limit}&storeId=${storeId}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	// if (active === 1) {
	// 	url += `&active=1`;
	// }

	const { data } =
		await HttpService.get<IApiResponse<{ storeProducts: ICatalougeTypes.IStoreProducts[] }>>(
			url
		);

	return data;
};

// eslint-disable-next-line max-params
export function useGetStoresProductsList(
	searchTerm: string,
	apiKey: string,
	active: 0 | 1,
	page: number,
	limit: number,
	storeId: string
) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, active, page, storeId],
		queryFn: getStoresProductsList,
		placeholderData: keepPreviousData,
	});
}
