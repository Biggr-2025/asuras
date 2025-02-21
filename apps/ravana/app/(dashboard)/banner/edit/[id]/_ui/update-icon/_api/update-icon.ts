import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../../../../types';

const updateBannerIcon = async (id: string, payload: FormData) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ banner: IBannerDetails }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/addIcon/${id}`,
			payload
		);
		return data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const customError = getCustomError(err.response);
			throw customError.customMessage;
		} else {
			throw 'An unexpected error occurred.';
		}
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
