import { useEffect, useMemo, useState } from 'react';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';

import { UtilsSearch } from '../../../../../../../../core/ui';
import { useGetBannerGroupDetails } from '../../../_api/get-banner-group-details';
import { useUpdateBannerGroupProducts } from '../_api/update-banner-group-products';
import { TableComponent } from './table';

interface ProductUtilsProps {
	bannerId: string;
	activeId: string;
	type: 'BRAND' | 'DEPARTMENT' | 'CATEGORY' | 'SUBCATEGORY';
}

export interface IBannerGroup {
	brands?: { name: string; _id: string }[];
	departments?: { name: string; _id: string }[];
	categories?: { name: string; _id: string }[];
	subCategories?: { name: string; _id: string }[];
}

const typeToKeyMap: Record<ProductUtilsProps['type'], keyof IBannerGroup> = {
	BRAND: 'brands',
	DEPARTMENT: 'departments',
	CATEGORY: 'categories',
	SUBCATEGORY: 'subCategories',
};

export default function ProductUtils({ bannerId, activeId, type }: ProductUtilsProps) {
	const { data: bannerData, refetch } = useGetBannerGroupDetails(activeId, bannerId);
	const { mutateAsync: updateGroupImageProducts } = useUpdateBannerGroupProducts(bannerId);

	const bannerGroup: IBannerGroup = useMemo(() => bannerData?.data?.group || {}, [bannerData]);

	const groupKey = typeToKeyMap[type];

	const [names, setNames] = useState<{ id: string; name: string }[]>([]);

	useEffect(() => {
		const items = (bannerGroup[groupKey] || []).map((group) => ({
			id: group._id,
			name: group.name,
		}));
		setNames(items);
	}, [bannerGroup, groupKey]);

	const handleUtil = async (product: { name: string; _id: string }) => {
		const updatedItems = [
			...(bannerGroup[groupKey] || []),
			{ name: product.name, _id: product._id },
		];
		const payload: Partial<IBannerGroup> & { bannerGroupId: string } = {
			bannerGroupId: activeId,
			[groupKey]: updatedItems,
		};
		const response = await updateGroupImageProducts(payload);
		if (response.status === 'SUCCESS') refetch();
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	const rowIds = names.map(({ name }) => name);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!active || !over || active.id === over.id) return;

		setNames((prevNames) => {
			const oldIndex = prevNames.findIndex((item) => item.id === active.id);
			const newIndex = prevNames.findIndex((item) => item.id === over.id);

			return oldIndex !== -1 && newIndex !== -1
				? arrayMove(prevNames, oldIndex, newIndex)
				: prevNames;
		});
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="p-16">
				<UtilsSearch type={type} handleUtil={handleUtil} />
				<TableComponent
					bannerId={bannerId}
					activeId={activeId}
					tableData={names}
					rowIds={rowIds}
					groupKey={groupKey}
					refetch={refetch}
				/>
			</div>
		</DndContext>
	);
}
