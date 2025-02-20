'use client';

import { useParams } from 'next/navigation';

import { useGetProductUtilsList } from '../../../../../../core/api/app-utils/product-utils';
import Item from './_ui/item';

export default function Page() {
	const params = useParams();
	const { data, refetch } = useGetProductUtilsList({
		apiKey: 'productUtil/name',
		utilType: params?.type as string,
		searchTerm: '',
		active: 1,
		page: 0,
		limit: 5,
		count: 0,
		name: params?.name && decodeURIComponent(params?.name as string),
	});
	const imageData = data?.data?.list?.[0]?.image || ({} as ICatalougeTypes.ICategoryImage);

	return (
		<div className="h-full">
			{params?.name && (
				<h1 className="text-24 p-16">
					Upload image for{' '}
					<span className="font-medium">
						{decodeURIComponent(params?.name as string)}
					</span>
				</h1>
			)}
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
							defaultImage={imageData[i.type as keyof ICatalougeTypes.ICategoryImage]}
						/>
					);
				})}
			</div>
		</div>
	);
}
