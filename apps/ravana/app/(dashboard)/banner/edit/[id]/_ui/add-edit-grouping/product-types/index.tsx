import { JSX, useState } from 'react';

import { IBannerImage } from '../../../../../../../../types';
import { useGetBannerGroupDetails } from '../../../_api/get-banner-group-details';
import ProductUtils from '../product-utils';
import ProductsList from '../products-list';
import PickType from './pick-type';
import { useSelectType } from './select-type';

export default function ProductTypes({
	bannerId,
	activeId,
}: {
	bannerId: string;
	activeId: string;
}) {
	const { data } = useGetBannerGroupDetails(activeId, bannerId);
	const bannerGroup = data?.data?.group || ({} as IBannerImage);
	const [showSelect, setShowSelect] = useState<
		'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | null
	>(null);

	useSelectType({ setShowSelect, bannerGroup });

	const componentMap: Record<string, JSX.Element> = {
		brands: <ProductUtils type="BRAND" bannerId={bannerId} activeId={activeId} />,
		departments: <ProductUtils type="DEPARTMENT" bannerId={bannerId} activeId={activeId} />,
		categories: <ProductUtils type="CATEGORY" bannerId={bannerId} activeId={activeId} />,
		subCategories: <ProductUtils type="SUBCATEGORY" bannerId={bannerId} activeId={activeId} />,
		productIds: <ProductsList bannerId={bannerId} activeId={activeId} />,
	};

	return (
		<div>
			{!showSelect ? <PickType setShowSelect={setShowSelect} /> : componentMap[showSelect]}
		</div>
	);
}
