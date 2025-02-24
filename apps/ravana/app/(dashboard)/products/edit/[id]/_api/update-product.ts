import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../../../../../core/primitives';
import { HttpService } from '../../../../../../core/services';
import { IApiResponse } from '../../../../../../types';

interface IPayload {
	title: string;
	description?: string;
	// quantity: number;
	packQuantity: number;
	mrp: number;
	// price: number;
	gstInPercent: number;
	hsn: string;
	brandId: string;
	categoryId: string;
	subCategoryId: string;
	departmentId: string;
	colour?: string;
	size?: string;
	barCodeNo?: string;
}

const updateProduct = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateProduct}/${id}`,
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

export function useUpdateProduct(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateProduct(id, payload),
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

export default useUpdateProduct;
