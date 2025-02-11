import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface IPayload {
	mobile: number;
}

const getOtp = async (payload: IPayload) => {
	try {
		const { data } = await axios.post<ICommonTypes.IApiResponse<{ type: 'success' | 'error' }>>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/sendOtp`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useGetOtp() {
	return useMutation({
		mutationFn: getOtp,
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('OTP generated successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
