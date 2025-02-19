import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

interface IPayload {
	productIds?: string[];
	brands?: string[];
	bannerGroupId: string;
}

const updateBannerGroupProducts = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ banner: ICatalougeTypes.IBannerDetails }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/updateGroupItems/${id}`, payload);
		return data;
	} catch (err) {
		console.log(err);
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateBannerGroupProducts(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateBannerGroupProducts(payload, id),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Products updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
