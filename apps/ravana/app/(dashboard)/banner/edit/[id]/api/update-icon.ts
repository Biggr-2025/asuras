import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';

const updateBannerIcon = async (id: string, payload: FormData) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ banner: ICatalougeTypes.IBannerDetails }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/addIcon/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateBannerIcon(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updateBannerIcon(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('banner icon added successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
