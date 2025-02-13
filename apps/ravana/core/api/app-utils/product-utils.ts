import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '../../services';

const getProductUtilsList = async ({
	queryKey,
}: QueryFunctionContext<[string, Record<string, any>]>) => {
	const [_key, params] = queryKey;

	const queryString = qs.stringify(params, {
		skipNulls: true,
		encodeValuesOnly: true,
	});

	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/list?${queryString}`;

	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<{ list: ICatalougeTypes.ICategory[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetProductUtilsList({
	apiKey,
	type,
	searchTerm,
	active,
	page,
	limit,
	count,
	department,
	category,
	name,
	enabled,
}: {
	apiKey: string;
	type: string;
	searchTerm: string;
	active: 0 | 1;
	page: number;
	limit: number;
	count: 0 | 1;
	department?: string;
	category?: string;
	name?: string;
	enabled?: boolean;
}) {
	const queryParams = {
		utilType: type,
		searchTerm: searchTerm?.length > 2 ? searchTerm : undefined,
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
