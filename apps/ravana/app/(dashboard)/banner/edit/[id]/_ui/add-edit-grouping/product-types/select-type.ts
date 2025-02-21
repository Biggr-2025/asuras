import { useEffect } from 'react';

import { IBannerImage } from '../../../../../../../../types';

export function useSelectType({
	setShowSelect,
	bannerGroup,
}: {
	setShowSelect: (
		s: 'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | null
	) => void;
	bannerGroup: Partial<IBannerImage>;
}) {
	useEffect(() => {
		const arrayKeys: Array<
			keyof Pick<
				IBannerImage,
				'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories'
			>
		> = ['brands', 'categories', 'departments', 'subCategories', 'productIds'];

		const found = arrayKeys.find(
			(key) => Array.isArray(bannerGroup?.[key]) && bannerGroup?.[key]?.length > 0
		);

		setShowSelect(found ?? null);
	}, [bannerGroup, setShowSelect]);
}
