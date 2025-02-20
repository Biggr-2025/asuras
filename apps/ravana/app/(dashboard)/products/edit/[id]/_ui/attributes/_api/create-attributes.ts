import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../../../../../../../core/primitives';
import { HttpService } from '../../../../../../../../core/services';
import { IApiResponse } from '../../../../../../../../types';

interface IPayload {
	key: string;
	value: string;
	attributeKey: string;
}

const createProductAttribute = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddProductAttribute}/${id}`,
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

export function useCreateProductAttribute(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => createProductAttribute(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Attribute created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateProductAttribute;
