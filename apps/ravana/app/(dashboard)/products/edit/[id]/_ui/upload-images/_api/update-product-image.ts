import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse } from '../../../../../../../../types';

const updateProductImage = async (id: string, payload: FormData) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/product/changeImage/${id}`,
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

export function useUpdateProductImage(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updateProductImage(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('image attributes updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
