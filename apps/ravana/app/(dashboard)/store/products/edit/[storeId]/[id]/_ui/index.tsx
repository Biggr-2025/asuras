'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { useGetStoreProductById } from '../../../../../../../../core/api';
import { Routes } from '../../../../../../../../core/primitives';
import { useUpdateStoreProduct } from '../_api/update-product';
import ProductForm from './product-form';

const schema = z.object({
	quantity: z
		.string()
		.min(1, { message: 'Quantity is required' })
		.refine((val) => Number(val) >= 0, { message: 'Quantity must be a positive number' }),
	price: z
		.string()
		.min(1, { message: 'Price is required' })
		.refine((val) => Number(val) >= 0, { message: 'Price must be a positive number' }),
	discount: z
		.string()
		.min(1, { message: 'Discount is required' })
		.refine((val) => Number(val) >= 0, { message: 'Discount must be a positive number' }),
	comment: z.string().optional(),
	status: z.string().min(1, { message: 'Status is required' }),
	active: z.string().min(1, { message: 'Active is required' }),
});

export type IFormData = z.infer<typeof schema>;

export function EditStoreProduct() {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			quantity: '',
			price: '',
			discount: '',
			comment: '',
			status: '',
			active: '',
		},
	});
	const router = useRouter();
	const searchParams = useSearchParams();
	const storeProductId = searchParams.get('storeProductId');
	const { data } = useGetStoreProductById(storeProductId as string);
	const { mutateAsync: updateStoreProduct, isPending } = useUpdateStoreProduct(
		storeProductId as string
	);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (data?.data?.storeProduct) {
			form.setValue('price', data.data.storeProduct.price.toString() || '');
			form.setValue('quantity', data.data.storeProduct.quantity.toString() || '');
			form.setValue('discount', data.data.storeProduct.discount.toString() || '');
			form.setValue('comment', data.data.storeProduct.comment || '');
			form.setValue('status', data.data.storeProduct.status || '');
			form.setValue('active', data.data.storeProduct.active ? 'true' : 'false');
		}
	}, [data?.data?.storeProduct, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			quantity: Number(values.quantity),
			price: Number(values.price),
			discount: Number(values.discount),
			comment: values.comment,
			status: values.status,
			active: values.active === 'true',
		};
		const response = await updateStoreProduct(payload);
		if (response.status === 'SUCCESS') {
			await queryClient.invalidateQueries({
				queryKey: ['stores/list'],
				type: 'active',
			});
			router.push(
				`${Routes.StoreDetails}/${response.data.storeProduct.storeId}?type=products`
			);
		}
	};

	return (
		<div className="rounded-8 shadow-card1 max-w-[720px] bg-white px-16 py-32">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-24">
					<ProductForm form={form} />
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
	);
}
