import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../core/services';

const getStoreDetails = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, storeId] = queryKey;
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{ store: IStoreTypes.IStoreDetails }>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${storeId}`);
	return data;
};

export function useGetStoreDetails(storeId: string) {
	return useQuery({
		queryKey: ['store/byId', storeId],
		queryFn: getStoreDetails,
		enabled: !!storeId,
	});
}
