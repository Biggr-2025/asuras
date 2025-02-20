import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse } from '../../../../../../types';

const createBannerGroup = async (id: string, payload?: FormData | null) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ banner: ICatalougeTypes.IBannerDetails }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/addGroup/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
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
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
