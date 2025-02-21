import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../core/services';
import { IApiResponse, IBanner } from '../../../../../types';

const getBanners = async ({ queryKey }: QueryFunctionContext<[string, string, number, number]>) => {
	const [_key, searchTerm, limit, page] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?page=${page}&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}

	const { data } = await HttpService.get<IApiResponse<{ banners: IBanner[] }>>(url);

	return data;
};

export function useGetBanners(searchTerm: string, limit: number, page: number) {
	return useQuery({
		queryKey: ['banner/list', searchTerm, limit, page],
		queryFn: getBanners,
		placeholderData: keepPreviousData,
	});
}
