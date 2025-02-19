import { useState } from 'react';

import { useGetBannerGroupDetails } from '../../../api/get-banner-group-details';
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
	const bannerGroup = data?.data?.group || ({} as ICatalougeTypes.IBannerImage);
	const [showSelect, setShowSelect] = useState<
		'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | null
	>(null);

	useSelectType({ setShowSelect: setShowSelect, bannerGroup: bannerGroup });

	return (
		<div>
			{!showSelect && <PickType setShowSelect={setShowSelect} />}
			{showSelect === 'brands' && (
				<ProductUtils bannerId={bannerId} activeId={activeId as string} />
			)}
			{showSelect === 'productIds' && (
				<ProductsList bannerId={bannerId} activeId={activeId as string} />
			)}
		</div>
	);
}
