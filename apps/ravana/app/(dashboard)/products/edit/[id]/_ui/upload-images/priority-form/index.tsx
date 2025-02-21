import { useForm } from 'react-hook-form';
import { Button, Form } from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import image from 'next/image';
import { z } from 'zod';

import { IProductImage } from '../../../../../../../../types';
import { useUpdateImageAttributes } from '../_api/update-image-attributes';
import ActiveField from './active-field';
import PriorityField from './priority-field';

type IFormData = {
	priority: string;
	active: string;
};

const schema = z.object({
	priority: z.string().min(1, { message: 'Priority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function PriorityUpdateForm({
	image,
	id,
	refetch,
}: {
	image: IProductImage;
	id: string;
	refetch: () => void;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			priority: image?.priority?.toString() || '',
			active: image?.active?.toString() || 'true',
		},
	});
	const { mutateAsync: updateImageAttributes, isPending } = useUpdateImageAttributes(id);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			productImageId: image._id,
			active: values.active === 'true',
			priority: Number(values.priority),
		};
		const response = await updateImageAttributes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className="rounded-12 border-grey-light mt-24 flex max-w-[720px] flex-col gap-12 border p-16">
			<h2>Update Priority</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 justify-between gap-24"
				>
					<PriorityField control={form.control} />
					<ActiveField control={form.control} />
					<Button
						className="max-w-[240px]"
						loading={isPending}
						loadingText="Updating..."
						disabled={isPending}
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
