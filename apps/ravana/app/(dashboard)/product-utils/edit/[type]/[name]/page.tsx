'use client';

import { useParams } from 'next/navigation';

import { useGetProductUtilsList } from '../../../../../../core/api/app-utils/product-utils';
import { ICategoryImage } from '../../../../../../types';
import Item from './_ui/item';

const mapType: Record<string, string> = {
	DEPARTMENT: 'departmentId',
	CATEGORY: 'categoryId',
	SUBCATEGORY: 'subCategoryId',
	BRAND: 'brandId',
};

export default function Page() {
	const params = useParams();
	const filterKey = params?.type ? mapType[params.type as string] : undefined;
	const { data, refetch } = useGetProductUtilsList({
		apiKey: 'productUtil/name',
		utilType: params?.type as string,
		searchTerm: '',
		active: 0,
		page: 0,
		limit: 5,
		count: 0,
		...(filterKey ? { [filterKey]: params.name } : {}),
	});
	const imageData = data?.data?.list?.[0]?.image || ({} as ICategoryImage);

	return (
		<div className="h-full">
			<div className="gap-54 flex h-full items-center justify-center">
				{[
					{ label: 'Icon', name: 'ICON', type: 'iconUrl' },
					{ label: 'Small', name: 'SMALL', type: 'smallUrl' },
					{ label: 'Medium', name: 'MEDIUM', type: 'mediumUrl' },
					{ label: 'Large', name: 'LARGE', type: 'largeUrl' },
				].map((i) => {
					return (
						<Item
							key={i.name}
							item={i}
							refetch={refetch}
							defaultImage={imageData[i.type as keyof ICategoryImage]}
						/>
					);
				})}
			</div>
		</div>
	);
}
