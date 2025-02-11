import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { useCreateProduct } from '../add/api';
import { useGetProductById, useUpdateProduct } from '../edit/[id]/api';
import { FormInput } from './input';
import { FormSelect } from './select';
import { IFormData, schema } from './utils';

export function ProductForm({ type }: { type: 'ADD' | 'EDIT' }) {
	const params = useParams();
	const router = useRouter();
	const { data, refetch } = useGetProductById(params?.id as string);
	const productData = useMemo(() => {
		return data?.data?.product || ({} as ICatalougeTypes.IProduct);
	}, [data?.data?.product]);
	const { mutateAsync: createProduct, isPending } = useCreateProduct();
	const { mutateAsync: updateProduct, isPending: isLoading } = useUpdateProduct(
		params?.id as string
	);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		if (type === 'EDIT' && params?.id) {
			form.reset({
				title: productData?.title || '',
				description: productData?.description || '',
				quantity: productData?.quantity?.toString() || '',
				packQuantity: productData?.packQuantity?.toString() || '',
				mrp: productData?.mrp?.toString() || '',
				price: productData?.price?.toString() || '',
				gstInPercent: productData?.gstInPercent?.toString() || '',
				hsn: productData?.hsn || '',
				department: productData?.department || '',
				brand: productData?.brand || '',
				category: productData?.category || '',
				subcategory: productData?.subcategory || '',
				colour: productData?.colour || '',
				size: productData?.size || '',
				active: productData?.active?.toString() || 'true',
			});
		}
	}, [form, params?.id, productData, type]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			quantity: Number(values.quantity),
			packQuantity: Number(values.packQuantity),
			mrp: Number(values.mrp),
			price: Number(values.price),
			gstInPercent: Number(values.gstInPercent),
			active: values.active === 'true',
		};
		if (type === 'ADD') {
			const response = await createProduct(payload);
			if (response.status === 'SUCCESS') {
				form.reset();
				router.push(`/edit/${response?.data?.product?.productId}?type=images`);
			}
		} else {
			const response = await updateProduct(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	return (
		<div className="rounded-8 py-18 shadow-card1 max-w-[720px] bg-white px-16">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-24">
					<FormInput name="title" label="Title" form={form} />
					<FormInput name="description" label="Description" form={form} isTextArea />
					<FormInput name="quantity" label="Quantity" form={form} type="number" />
					<FormInput
						name="packQuantity"
						label="Pack Quantity"
						form={form}
						type="number"
					/>
					<FormInput name="mrp" label="MRP" form={form} type="number" />
					<FormInput name="price" label="Price" form={form} type="number" />
					<FormInput name="gstInPercent" label="GST in %" form={form} type="number" />
					<FormInput name="hsn" label="HSN" form={form} />
					<FormInput name="colour" label="Colour" form={form} />
					<FormInput name="size" label="Size" form={form} />
					<FormSelect
						name="department"
						label="Department"
						paramKey="DEPARTMENT"
						form={form}
					/>
					<FormSelect name="category" label="Category" form={form} paramKey="CATEGORY" />
					<FormSelect
						name="subcategory"
						label="Sub Category"
						form={form}
						paramKey="SUBCATEGORY"
					/>
					<FormSelect name="brand" label="Brand" form={form} paramKey="BRAND" />
					<Button
						type="submit"
						disabled={isPending || isLoading}
						loading={isPending || isLoading}
						className="col-span-2"
					>
						{type === 'EDIT' ? 'Update' : 'Add'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
