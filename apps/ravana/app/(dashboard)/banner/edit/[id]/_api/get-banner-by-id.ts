import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../../types';

const getBannerById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ banner: IBannerDetails }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetBannerById(id: string) {
	return useQuery({
		queryKey: ['banner/byId', id],
		queryFn: getBannerById,
		enabled: !!id,
	});
}
