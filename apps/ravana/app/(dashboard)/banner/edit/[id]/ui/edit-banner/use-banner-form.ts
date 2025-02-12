import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

import { useGetBannerById } from '../../api/get-banner-by-id';
import useUpdateBanner from '../../api/update-banner';
import { bannerSchema, IFormData } from './schema';

export const useBannerForm = () => {
	const form = useForm<IFormData>({
		resolver: zodResolver(bannerSchema),
		defaultValues: {
			title: '',
			description: '',
			active: false,
			bgColorCode: '',
			isImage: false,
			rank: '0',
		},
	});
	const params = useParams();
	const { mutateAsync: updateBanner, isPending } = useUpdateBanner(params?.id as string);
	const { data, refetch } = useGetBannerById(params?.id as string);

	useEffect(() => {
		if (params?.id) {
			form.reset({
				title: data?.data?.banner?.title || '',
				description: data?.data?.banner?.description || '',
				active: data?.data?.banner?.active || false,
				bgColorCode: data?.data?.banner?.bgColorCode || '',
				isImage: data?.data?.banner?.isImage || false,
				rank: data?.data?.banner?.rank?.toString() || '0',
			});
		}
	}, [data?.data?.banner, form, params?.id]);

	const onSubmit = async (values: IFormData) => {
		const payload = { ...values, rank: Number(values.rank) };
		const response = await updateBanner(payload);
		if (response.status === 'SUCCESS') refetch();
	};

	return { form, onSubmit, isPending };
};
