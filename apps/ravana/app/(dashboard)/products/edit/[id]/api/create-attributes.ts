import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../../../../../core/primitives';
import { HttpService } from '../../../../../../core/services';

interface IPayload {
	key: string;
	value: string;
	attributeKey: string;
}

const createProductAttribute = async (id: string, payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ product: ICatalougeTypes.IProduct }>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddProductAttribute}/${id}`,
			payload
		);
		return data;
	} catch (err) {
		throw new Error('Network Error. Please try again.');
	}
};

export function useCreateProductAttribute(id: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => createProductAttribute(id, payload),
		onSuccess: (data) => {
			if (data.status === 'SUCCESS') {
				toast.success('Attribute created successfully.');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useCreateProductAttribute;
