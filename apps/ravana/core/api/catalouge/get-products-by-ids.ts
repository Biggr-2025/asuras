import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { IApiResponse } from '../../../types';
import { IProduct } from '../../../types/catalouge';
import { HttpService } from '../../services';

const getProductById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ products: IProduct[] }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?productIds=${_params}`
	);
	return data;
};

export function useGetProductsByIds(ids: string) {
	return useQuery({
		queryKey: ['product/list', ids],
		queryFn: getProductById,
		enabled: !!ids,
	});
}
