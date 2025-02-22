import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../core/services';
import { IApiResponse, IStoreDetails } from '../../../../../../types';

interface IPayload {
	ownerName?: string;
	businessContact?: number;
	entityName?: string;
	panNo?: string;
	gstNo?: string;
}

const updateBusinessDetails = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ store: IStoreDetails }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/businessDetail/${id}`,
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

export function useUpdateBusinessDetails(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateBusinessDetails(payload, id),
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
