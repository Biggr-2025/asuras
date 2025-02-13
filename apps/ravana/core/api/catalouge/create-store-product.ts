import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services';

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
		const { data } = await HttpService.post<
			ICommonTypes.IApiResponse<{ storeProduct: ICatalougeTypes.IStoreProducts }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/store/addProduct`, payload);
		return data;
	} catch (err: any) {
		throw new Error(err.response?.data?.msg || 'Network Error. Please try again.');
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
