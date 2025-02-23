import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

import { usePincodeMutation } from '../../../../../../../../core/api/app-utils/get-pincode';
import { IAddress, IStoreDetails } from '../../../../../../../../types';
import { useGetStoreDetails } from '../../../_api/get-store-details';
import { useCreateAddress } from './_api/create-address';
import { useGetAddressById } from './_api/get-address-byid';
import { useUpdateAddress } from './_api/update-address';
import { IFormData, schema } from './schema';

export function useAddressForm() {
	const params = useParams();
	const { data } = useGetStoreDetails(params?.id as string);
	const details = data?.data?.store || ({} as IStoreDetails);
	const { addressId } = details;
	const { data: addressData, refetch } = useGetAddressById(addressId as string);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
	});
	const pincode = form.watch('pincode');
	const { mutateAsync: fetchPincode } = usePincodeMutation();

	const addressUpdate = useMemo(() => {
		return addressData?.data?.address || ({} as IAddress);
	}, [addressData?.data?.address]);

	const { mutateAsync: createAddress, isPending } = useCreateAddress(params?.id as string);
	const { mutateAsync: updateAddress, isPending: isLoading } = useUpdateAddress(
		params?.id as string,
		addressId as string
	);

	useEffect(() => {
		if (addressId) {
			form.reset({
				line1: addressUpdate?.line1 ?? '',
				line2: addressUpdate?.line2 ?? '',
				pincode: addressUpdate?.pincode ?? '',
				state: addressUpdate?.state ?? '',
				district: addressUpdate?.district ?? '',
			});
		}
	}, [
		addressId,
		addressUpdate?.district,
		addressUpdate?.line1,
		addressUpdate?.line2,
		addressUpdate?.pincode,
		addressUpdate?.state,
		form,
	]);

	useEffect(() => {
		if (pincode?.length === 6) {
			handlePincode();
		}
	}, [pincode?.length]);

	const handlePincode = async () => {
		const response = await fetchPincode(pincode);
		if (response.status === 'SUCCESS') {
			const { state, district } = response.data.address;
			form.setValue('state', state);
			form.setValue('district', district);
		}
	};

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			type: 'HOME',
		};
		if (addressId) {
			const response = await updateAddress(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		} else {
			const response = await createAddress(payload);
			if (response.status === 'SUCCESS') {
				refetch();
				form.reset();
			}
		}
	};

	return { form, onSubmit, isPending, isLoading };
}
