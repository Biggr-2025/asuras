import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../core/services';
import { IApiResponse } from '../../../../types';

const updateProductUtils = async (name: string, payload: any) => {
	const { apiKey, ...rest } = payload;
	try {
		const { data } = await HttpService.patch<IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/${apiKey}/${name}`,
			rest
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

export function useUpdateProductUtils(name: string) {
	return useMutation({
		mutationFn: (payload: any) => updateProductUtils(name, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
