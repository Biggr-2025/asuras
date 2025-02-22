import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../../core/services';
import { IApiResponse, IStoreProducts } from '../../../../../../../../../types';

interface IPayload {
	storeId: string;
	productId: string;
	quantity: number;
	price: number;
	discount: number;
	comment: string | undefined;
}

const createStoreProduct = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<IApiResponse<{ storeProduct: IStoreProducts }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/addProduct`,
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

export function useCreateStoreProduct() {
	return useMutation({
		mutationFn: createStoreProduct,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Product added successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
