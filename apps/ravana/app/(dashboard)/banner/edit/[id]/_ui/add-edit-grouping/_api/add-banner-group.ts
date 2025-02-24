import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../../../../types';

const createBannerGroup = async (id: string, payload?: FormData | null) => {
	const { data } = await HttpService.patch<IApiResponse<{ banner: IBannerDetails }>>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/addGroup/${id}`,
		payload
	);
	return data;
};

export function useCreateBannerGroup(id: string) {
	return useMutation({
		mutationFn: (payload?: FormData | null) => createBannerGroup(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('banner image added successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
	});
}
