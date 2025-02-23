import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../../core/services';
import { IApiResponse, IStoreDetails } from '../../../../../../../../../types';

interface IPayload {
	pincodes: string[];
}

const updatePincodes = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ store: IStoreDetails }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/pincode/${id}`,
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

export function useUpdatePincodes(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updatePincodes(payload, id),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
