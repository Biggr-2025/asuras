import { useEffect } from 'react';

export function useSelectType({
	setShowSelect,
	bannerGroup,
}: {
	setShowSelect: (
		s: 'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | null
	) => void;
	bannerGroup: Partial<ICatalougeTypes.IBannerImage>;
}) {
	useEffect(() => {
		const arrayKeys: Array<
			keyof Pick<
				ICatalougeTypes.IBannerImage,
				'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories'
			>
		> = ['brands', 'categories', 'departments', 'subCategories', 'productIds'];

		const found = arrayKeys.find(
			(key) => Array.isArray(bannerGroup?.[key]) && bannerGroup?.[key]?.length > 0
		);

		setShowSelect(found ?? null);
	}, [bannerGroup, setShowSelect]);
}
