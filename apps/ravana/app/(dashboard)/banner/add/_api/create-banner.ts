import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../core/services';
import { IApiResponse, IBannerDetails } from '../../../../../types';

interface IPayload {
	title: string;
	description: string;
	type: string;
}

const createBanner = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<IApiResponse<{ banner: IBannerDetails }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/banner/create`,
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

export function useCreateBanner() {
	return useMutation({
		mutationFn: createBanner,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Banner created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateBanner;
