import { getCustomError } from '@asuras/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { HttpService } from '../../../../../core/services';
import { IApiResponse } from '../../../../../types';

interface IPayload {
	mobile: number;
	name: string;
}

const createStore = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/store/add`,
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

export function useCreateStore() {
	return useMutation({
		mutationFn: createStore,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Store created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
