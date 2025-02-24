/* eslint-disable indent */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Routes } from '../../../../core/primitives';
import { IProduct } from '../../../../types';
import useCreateProduct from '../add/_api/create-product';
import { useGetProductById, useUpdateProduct } from '../edit/[id]/_api';
import { IFormData, schema } from './schema';

export function useProductForm(type: 'ADD' | 'EDIT') {
	const params = useParams();
	const router = useRouter();
	const { data, refetch } = useGetProductById(params?.id as string);

	const productData = useMemo(() => {
		return data?.data?.product || ({} as IProduct);
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
				// quantity: productData?.quantity?.toString() ?? '',
				packQuantity: productData?.packQuantity?.toString() ?? '',
				mrp: productData?.mrp?.toString() ?? '',
				// price: productData?.price?.toString() ?? '',
				gstInPercent: productData?.gstInPercent?.toString() ?? '',
				hsn: productData?.hsn ?? '',
				brandId: productData?.brand
					? { _id: productData.brand.brandId, name: productData.brand.name }
					: undefined,
				categoryId: productData?.category
					? { _id: productData.category.categoryId, name: productData.category.name }
					: undefined,
				subCategoryId: productData?.subCategory
					? {
							_id: productData.subCategory.subCategoryId,
							name: productData.subCategory.name,
						}
					: undefined,
				departmentId: productData?.department
					? {
							_id: productData.department.departmentId,
							name: productData.department.name,
						}
					: undefined,
				colour: productData?.colour ?? '',
				size: productData?.size ?? '',
				active: productData?.active?.toString() || 'true',
				barCodeNo: productData?.barCodeNo ?? '',
			});
		}
	}, [form, params?.id, productData, type]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			// quantity: Number(values.quantity),
			packQuantity: Number(values.packQuantity),
			mrp: Number(values.mrp),
			// price: Number(values.price),
			gstInPercent: Number(values.gstInPercent),
			active: values.active === 'true',
			brandId: values?.brandId?._id,
			categoryId: values?.categoryId?._id,
			subCategoryId: values?.subCategoryId?._id,
			departmentId: values?.departmentId?._id,
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
