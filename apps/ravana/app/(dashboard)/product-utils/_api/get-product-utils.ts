import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '../../../../core/services';
import { IApiResponse } from '../../../../types';

interface IProductUtilsParams {
	apiKey: string;
	utilType: string;
	searchTerm?: string;
	active: 0 | 1;
	page: number;
	limit: number;
	count: 0 | 1;
	department?: string;
	category?: string;
	name?: string;
	enabled?: boolean;
}

const getProductUtilsList = async ({
	queryKey,
}: QueryFunctionContext<[string, Partial<IProductUtilsParams>]>) => {
	const [_key, params] = queryKey;

	const queryString = qs.stringify(params, {
		skipNulls: true,
		encodeValuesOnly: true,
	});

	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/list?${queryString}`;

	const { data } = await HttpService.get<IApiResponse<{ list: any[]; totalCount: number }>>(url);

	return data;
};

export function useGetProductUtilsList({
	apiKey,
	utilType,
	searchTerm,
	active,
	page,
	limit,
	count,
	department,
	category,
	name,
	enabled = true,
}: IProductUtilsParams) {
	const queryParams: Partial<IProductUtilsParams> = {
		utilType,
		searchTerm: searchTerm && searchTerm.length > 2 ? searchTerm : undefined,
		active: active === 1 ? active : undefined,
		count: count === 1 ? count : undefined,
		page,
		limit,
		department,
		category,
		name,
	};
	return useQuery({
		queryKey: [apiKey, queryParams],
		queryFn: getProductUtilsList,
		placeholderData: keepPreviousData,
		enabled,
	});
}
