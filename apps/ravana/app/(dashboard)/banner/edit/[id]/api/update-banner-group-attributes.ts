import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse } from '../../../../../../types';

interface IPayload {
	title: string;
	description: string;
	active: boolean;
	xPriority: number;
	yPriority: number;
	bannerGroupId: string;
}

const updateBannerGroupAttributes = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/updateGroupAttribute/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateBannerGroupAttributes(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateBannerGroupAttributes(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('banner attributes updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
