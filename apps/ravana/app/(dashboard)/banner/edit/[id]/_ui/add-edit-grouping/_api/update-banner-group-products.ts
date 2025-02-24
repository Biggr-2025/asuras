import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../../../../types';

interface IPayload {
	productIds?: string[];
	brands?: { name: string; _id: string }[];
	departments?: { name: string; _id: string }[];
	categories?: { name: string; _id: string }[];
	subCategories?: { name: string; _id: string }[];
	bannerGroupId: string;
}

const updateBannerGroupProducts = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<IApiResponse<{ banner: IBannerDetails }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/updateGroupItems/${id}`,
		payload
	);
	return data;
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
	});
}
