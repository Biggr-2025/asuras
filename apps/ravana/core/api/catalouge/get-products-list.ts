/* eslint-disable max-params */
import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { IApiResponse } from '../../../types';
import { HttpService } from '../../services';

const getProductsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, 0 | 1, number, 0 | 1]>) => {
	const [_key, searchTerm, limit, active, page, count] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/product/list?page=${page}&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	if (active === 1) {
		url += `&active=1`;
	}
	if (count === 1) {
		url += `&count=1`;
	}

	const { data } =
		await HttpService.get<
			IApiResponse<{ products: ICatalougeTypes.IProduct[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetProductsList(
	searchTerm: string,
	apiKey: string,
	active: 0 | 1,
	page: number,
	limit: number,
	count: 0 | 1
) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, active, page, count],
		queryFn: getProductsList,
		placeholderData: keepPreviousData,
	});
}
