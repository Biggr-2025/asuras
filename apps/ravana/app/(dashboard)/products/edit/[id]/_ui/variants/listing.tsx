import { useMemo } from 'react';
import { Spinner } from '@asuras/ui';

import { useGetProductsByIds } from '../../../../../../../core/api';
import { useUpdateProductVariants } from '../../_api';
import { getColumns } from './columns';
import VariantTable from './table';

export default function VariantListing({
	ids,
	refetch,
	productId,
}: {
	ids: string[];
	refetch: () => void;
	productId: string;
}) {
	const { data, isLoading } = useGetProductsByIds(ids.join(','));
	const products = data?.data?.products || [];
	const { mutateAsync: updateProductVariants } = useUpdateProductVariants(productId);

	const columns = useMemo(
		() => getColumns(ids, updateProductVariants, refetch),
		[ids, updateProductVariants, refetch]
	);

	if (isLoading) {
		return <Spinner />;
	}

	return <VariantTable products={products} columns={columns} />;
}
