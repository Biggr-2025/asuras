import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse, IProduct } from '../../../../../../types';

const getProductById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ product: IProduct }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetProductById(id: string) {
	return useQuery({
		queryKey: ['product/byId', id],
		queryFn: getProductById,
		enabled: !!id,
	});
}
