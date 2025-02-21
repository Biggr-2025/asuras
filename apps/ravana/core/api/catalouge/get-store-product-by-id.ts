import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { IApiResponse } from '../../../types';
import { IStoreProducts } from '../../../types/catalouge';
import { HttpService } from '../../services';

const getStoreProductById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ storeProduct: IStoreProducts }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetStoreProductById(id: string) {
	return useQuery({
		queryKey: ['store/productById', id],
		queryFn: getStoreProductById,
		enabled: !!id,
	});
}
