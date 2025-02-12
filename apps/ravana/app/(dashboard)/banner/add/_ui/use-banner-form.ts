import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Routes } from '../../../../../core/primitives';
import useCreateBanner from '../api/create-banner';
import { bannerSchema, IFormData } from './schema';

export const useBannerForm = () => {
	const form = useForm<IFormData>({
		resolver: zodResolver(bannerSchema),
		defaultValues: {
			title: '',
			description: '',
			type: '',
		},
	});

	const router = useRouter();
	const { mutateAsync: createBanner, isPending } = useCreateBanner();

	const onSubmit = async (values: IFormData) => {
		const response = await createBanner(values);
		if (response.status === 'SUCCESS') {
			form.reset();
			router.push(`${Routes.EditBanner}/${response.data.banner._id}?type=details`);
		}
	};

	return { form, onSubmit, isPending };
};
