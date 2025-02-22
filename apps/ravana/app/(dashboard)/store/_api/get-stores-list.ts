import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../core/services';
import { IApiResponse, IStore } from '../../../../types';

interface IProps {
	searchTerm: string;
	apiKey: string;
	page: number;
	limit: number;
}

const getStoresList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number, number]>) => {
	const [_key, searchTerm, limit, pageParam] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/store/list?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
	}

	const { data } = await HttpService.get<IApiResponse<{ stores: IStore[] }>>(url);
	return data;
};

export function useGetStoresList({ searchTerm, apiKey, page, limit }: IProps) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, page],
		queryFn: getStoresList,
		placeholderData: keepPreviousData,
	});
}
