import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IProduct } from '../../../../../../../../types';

interface IPayload {
	id: string;
	attributeKey: string;
}

const removeProductAttributes = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ product: IProduct }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/product/removeAttribute/${id}`,
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

export function useRemoveProductAttributes(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => removeProductAttributes(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Removed successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
