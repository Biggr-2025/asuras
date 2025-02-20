import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../core/services';
import { IApiResponse } from '../../../../types';

const updateProductUtils = async (name: string, payload: any) => {
	const { apiKey, ...rest } = payload;
	try {
		const { data } = await HttpService.patch<IApiResponse<any>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/${apiKey}/${name}`,
			rest
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useUpdateProductUtils(name: string) {
	return useMutation({
		mutationFn: (payload: any) => updateProductUtils(name, payload),
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
