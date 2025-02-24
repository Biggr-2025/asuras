import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse } from '../../../../../../../../types';

interface IPayload {
	bannerGroupId: string;
}

const deleteBannerGroup = async (id: string, payload: IPayload) => {
	const { data } = await HttpService.patch<IApiResponse<any>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/removeGroup/${id}`,
		payload
	);
	return data;
};

export function useDeleteBannerGroup(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => deleteBannerGroup(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('group removed successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
	});
}
