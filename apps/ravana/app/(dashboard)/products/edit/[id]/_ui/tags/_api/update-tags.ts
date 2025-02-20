import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
		if (axios.isAxiosError(err)) {
			const customError = getCustomError(err.response);
			throw customError.customMessage;
		} else {
			throw 'An unexpected error occurred.';
		}
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
