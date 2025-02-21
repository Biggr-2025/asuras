import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse, IStoreProducts } from '../../../../../../../../types';

interface IPayload {
	quantity: number;
	price: number;
	discount: number;
	comment?: string | null;
	active: boolean;
	status: string;
}

const updateStoreProduct = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ storeProduct: IStoreProducts }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/updateProduct/${id}`,
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

export function useUpdateStoreProduct(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateStoreProduct(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Product updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
