import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../../../core/services';
import { IApiResponse } from '../../../../../../../types';

const updateUtilType = async (name: string, payload: FormData) => {
	try {
		const { data } = await HttpService.patch<IApiResponse<{ product: object }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/upload/${name}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateUtilType(name: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updateUtilType(name, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('banner updated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
