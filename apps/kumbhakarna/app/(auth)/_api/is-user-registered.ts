import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const isUserRegistered = async (payload: { mobile: string }) => {
	try {
		const { data } = await axios.get<
			ICommonTypes.IApiResponse<IAuthTypes.IsUserRegisteredInterface>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/isUser/${payload.mobile}`);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export function useGetIsUserRegistered() {
	return useMutation({
		mutationFn: isUserRegistered,
		onSuccess: (data) => {
			if (data.status !== 'SUCCESS' && !data.data.isUser) {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
