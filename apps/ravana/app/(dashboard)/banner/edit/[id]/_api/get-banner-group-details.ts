import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse, IBannerImage } from '../../../../../../types';

const getBannerGroupDetails = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
	const [_key, groupId, bannerId] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ group: IBannerImage }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${bannerId}/${groupId}`
	);
	return data;
};

export function useGetBannerGroupDetails(groupId: string, bannerId: string) {
	return useQuery({
		queryKey: ['banner/group', groupId, bannerId],
		queryFn: getBannerGroupDetails,
		enabled: !!groupId,
	});
}
