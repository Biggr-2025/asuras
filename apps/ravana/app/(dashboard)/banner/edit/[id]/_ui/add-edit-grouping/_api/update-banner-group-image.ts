import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../../../../types';

const updateBannerGroupImage = async (id: string, payload: FormData) => {
	const { data } = await HttpService.patch<IApiResponse<{ banner: IBannerDetails }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/changeGroupImage/${id}`,
		payload
	);
	return data;
};

export function useUpdateBannerGroupImage(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updateBannerGroupImage(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('banner image updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
	});
}
