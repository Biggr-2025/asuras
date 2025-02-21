import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../../../../core/primitives';
import { HttpService } from '../../../../../core/services';
import { IApiResponse, IProduct } from '../../../../../types';

interface IPayload {
	title: string;
	description?: string;
	quantity: number;
	packQuantity: number;
	mrp: number;
	price: number;
	gstInPercent: number;
	hsn: string;
	brand: string;
	category: string;
	subcategory: string;
	colour?: string;
	size?: string;
	barCodeNo?: string;
}

const createProduct = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<IApiResponse<{ product: IProduct }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.CreateProduct}`,
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

export function useCreateProduct() {
	return useMutation({
		mutationFn: createProduct,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Product created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateProduct;
