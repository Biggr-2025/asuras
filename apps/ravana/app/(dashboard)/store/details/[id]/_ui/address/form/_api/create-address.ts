import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../../../core/services';
import { IAddress, IApiResponse } from '../../../../../../../../../types';

interface IPayload {
	pincode: string;
	line1: string;
	line2?: string;
	type: string;
	state: string;
	district: string;
	lat?: string;
	lng?: string;
}

const createAddress = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.post<IApiResponse<{ address: IAddress }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/address/store/${id}`,
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

export function useCreateAddress(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => createAddress(payload, id),
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
