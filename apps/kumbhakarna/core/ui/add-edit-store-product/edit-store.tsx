'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';

import { useUpdateStoreProduct } from '../../../app/(dashboard)/products/edit/[id]/api/update-product';
import { useGetStoreProductById } from '../../api';
import { Routes } from '../../primitives';
import { FormFieldRenderer } from './form-renderer';

const schema = z.object({
	quantity: z
		.string()
		.min(1, { message: 'Quantity is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Quantity must be a positive number',
		}),
	price: z
		.string()
		.min(1, { message: 'Price is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Price must be a positive number',
		}),
	discount: z
		.string()
		.min(1, { message: 'Discount is required' })
		.refine((val) => Number(val) >= 0, {
			message: 'Discount must be a positive number',
		}),
});

type IFormData = z.infer<typeof schema>;

export function EditStoreProduct() {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			quantity: '',
			price: '',
			discount: '',
		},
	});
	const router = useRouter();
	const params = useParams();
	const { data } = useGetStoreProductById(params?.id as string);
	const { mutateAsync: updateStoreProduct, isPending } = useUpdateStoreProduct(
		params?.id as string
	);
	const queryClient = useQueryClient();

	const fields = useMemo(
		() => [
			{
				name: 'price',
				label: 'Price',
				keyboardType: 'numeric',
				type: 'text',
			},
			{
				name: 'quantity',
				label: 'Quantity',
				keyboardType: 'numeric',
				type: 'text',
			},
			{
				name: 'discount',
				label: 'Discount',
				keyboardType: 'numeric',
				type: 'text',
			},
		],
		[]
	);

	useEffect(() => {
		if (data?.data?.storeProduct) {
			form.setValue('price', data?.data?.storeProduct.price.toString() || '');
			form.setValue('quantity', data?.data?.storeProduct.quantity.toString() || '');
			form.setValue('discount', data?.data?.storeProduct.discount.toString() || '');
		}
	}, [data?.data?.storeProduct, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			quantity: Number(values.quantity),
			price: Number(values.price),
			discount: Number(values.discount),
		};
		const reponse = await updateStoreProduct(payload);
		if (reponse.status === 'SUCCESS') {
			await queryClient.invalidateQueries({
				queryKey: ['store/products/list'],
				type: 'active',
			});
			router.push(`${Routes.Home}`);
		}
	};

	return (
		<div className="rounded-8 shadow-card1 max-w-[720px] bg-white p-16">
			<div className="">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-2 gap-24"
					>
						{fields.map((field) => (
							<FormFieldRenderer key={field.name} field={field} form={form} />
						))}
						{data?.data?.storeProduct?.comment && (
							<div className="col-span-2">
								Comment: {data?.data?.storeProduct?.comment}
							</div>
						)}
						<div className="col-span-2">
							<Button
								disabled={isPending}
								loading={isPending}
								type="submit"
								className="w-[240px]"
							>
								Update
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
