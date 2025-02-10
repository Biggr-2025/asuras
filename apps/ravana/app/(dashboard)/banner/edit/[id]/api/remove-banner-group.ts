import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	bannerGroupId: string;
}

const deleteBannerGroup = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<ICommonTypes.IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/removeGroup/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
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
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
