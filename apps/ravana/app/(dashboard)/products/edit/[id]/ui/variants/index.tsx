'use client';

import { Spinner } from '@asuras/ui';
import { useParams } from 'next/navigation';

import { ProductSearch } from '../../../../../../../core/ui';
import { useGetProductById, useUpdateProductVariants } from '../../api';
import VariantListing from './listing';

export default function Variants() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const variantIds = data?.data?.product?.productVariantIds || [];
	const { mutateAsync: updateProductVariants } = useUpdateProductVariants(params?.id as string);

	const handleProduct = async (product: ICatalougeTypes.IProduct) => {
		const payload = {
			productVariantIds: [...variantIds, product.productId],
		};
		const response = await updateProductVariants(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="shadow-card1 rounded-12 mt-16 bg-white">
			<div className="flex items-center justify-between border-b px-16 py-8">
				<div className="text-16 font-semibold">Variants List</div>
				<ProductSearch handleProduct={handleProduct} />
			</div>
			<VariantListing ids={variantIds} refetch={refetch} productId={params?.id as string} />
		</div>
	);
}
