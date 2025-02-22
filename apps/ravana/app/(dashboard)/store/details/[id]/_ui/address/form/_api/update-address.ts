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

const updateAddress = async (payload: IPayload, id: string, addressId: string) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ address: IAddress }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/address/store/${id}/${addressId}`,
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

export function useUpdateAddress(id: string, addressId: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateAddress(payload, id, addressId),
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
