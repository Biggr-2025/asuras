import { useMemo } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { IBannerImage } from '../../../../../../../types';
import { useGetBannerGroupDetails } from '../../_api/get-banner-group-details';
import { useUpdateBannerGroupAttributes } from './_api/update-banner-group-attributes';
import { FieldRenderer } from './field-renderer';

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

const schema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(5, { message: 'Description is required' }),
	xPriority: z.string().min(1, { message: 'xPriority is required' }),
	yPriority: z.string().min(1, { message: 'yPriority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function EditImageDetails({ activeId }: { activeId: string }) {
	const params = useParams();
	const { data, refetch } = useGetBannerGroupDetails(activeId, params?.id as string);
	const bannergroupDetails = useMemo(
		() => data?.data?.group || ({} as IBannerImage),
		[data?.data?.group]
	);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: bannergroupDetails.title || '',
			description: bannergroupDetails.description || '',
			xPriority: bannergroupDetails.xPriority?.toString() || '',
			yPriority: bannergroupDetails.yPriority?.toString() || '',
			active: bannergroupDetails.active?.toString() || 'true',
		},
	});
	const { mutateAsync: updateBannerGroupAttributes, isPending } = useUpdateBannerGroupAttributes(
		params?.id as string
	);

	const fields = useMemo(
		() => [
			{ name: 'title', label: 'Title' },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{
				name: 'xPriority',
				label: 'xPriority',
				type: 'select',
				options: Array.from({ length: 9 }, (_, i) => ({
					value: String(i),
					label: String(i),
				})),
			},
			{
				name: 'yPriority',
				label: 'yPriority',
				type: 'select',
				options: Array.from({ length: 9 }, (_, i) => ({
					value: String(i),
					label: String(i),
				})),
			},
			{
				name: 'active',
				label: 'Type',
				type: 'select',
				options: [
					{ value: 'true', label: 'Active' },
					{ value: 'false', label: 'Inactive' },
				],
			},
		],
		[]
	);

	useEffect(() => {
		if (bannergroupDetails) {
			form.reset({
				title: bannergroupDetails.title || '',
				description: bannergroupDetails.description || '',
				xPriority: bannergroupDetails.xPriority?.toString() || '',
				yPriority: bannergroupDetails.yPriority?.toString() || '',
				active: bannergroupDetails.active?.toString() || 'true',
			});
		}
	}, [form, bannergroupDetails.title, bannergroupDetails]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			xPriority: Number(values.xPriority),
			yPriority: Number(values.yPriority),
			active: values.active === 'true',
			bannerGroupId: bannergroupDetails?._id as string,
		};
		const response = await updateBannerGroupAttributes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className="w-full">
			<div className="border-grey-light flex items-center justify-between border-b p-16">
				<h2 className="font-medium">Update Banner Details</h2>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex w-full flex-col justify-between p-16"
				>
					<FieldRenderer fields={fields} form={form} />
					<Button
						loading={isPending}
						disabled={isPending}
						className="mt-24 max-w-[240px]"
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
