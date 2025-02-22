import { useMutation } from '@tanstack/react-query';

import { IApiResponse } from '../../../types';
import { HttpService } from '../../services';

const fetchPincode = async (pincode: string) => {
	if (pincode.length !== 6) {
		throw new Error('Pincode must be exactly 6 digits.');
	}

	const { data } = await HttpService.get<
		IApiResponse<{
			address: {
				district: string;
				pincode: string;
				state: string;
			};
		}>
	>(`${process.env.NEXT_PUBLIC_BASE_PATH}/address/pincode/${pincode}`);
	return data;
};

export function usePincodeMutation() {
	return useMutation({
		mutationFn: fetchPincode,
	});
}
