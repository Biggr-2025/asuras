import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../../../../core/services';
import { IAddress, IApiResponse } from '../../../../../../../../../types';

const getAddressById = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ address: IAddress }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetAddressById(id: string) {
	return useQuery({
		queryKey: ['address/id', id],
		queryFn: getAddressById,
		enabled: !!id,
	});
}
