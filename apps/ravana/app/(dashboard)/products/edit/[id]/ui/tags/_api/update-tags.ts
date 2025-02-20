import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse } from '../../../../../../../../types';

interface IPayload {
	tags: string[];
}

const updateProductTags = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/product/addTags/${id}`, payload);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateProductTags(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateProductTags(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Tags updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateProductTags;
