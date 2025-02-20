import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Routes } from '../../../../core/primitives';
import { useCreateProduct } from '../add/api';
import { useGetProductById, useUpdateProduct } from '../edit/[id]/api';
import { IFormData, schema } from './schema';

export function useProductForm(type: 'ADD' | 'EDIT') {
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
				title: productData?.title ?? '',
				description: productData?.description ?? '',
				quantity: productData?.quantity?.toString() ?? '',
				packQuantity: productData?.packQuantity?.toString() ?? '',
				mrp: productData?.mrp?.toString() ?? '',
				price: productData?.price?.toString() ?? '',
				gstInPercent: productData?.gstInPercent?.toString() ?? '',
				hsn: productData?.hsn ?? '',
				brand: productData?.brand ?? '',
				category: productData?.category ?? '',
				subcategory: productData?.subcategory ?? '',
				colour: productData?.colour ?? '',
				size: productData?.size ?? '',
				active: productData?.active?.toString() || 'true',
				barCodeNo: productData?.barCodeNo ?? '',
				department: productData?.department ?? '',
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
				router.push(
					`${Routes.EditProduct}/${response?.data?.product?.productId}?type=product`
				);
			}
		} else {
			const response = await updateProduct(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	return { form, onSubmit, isPending, isLoading };
}
