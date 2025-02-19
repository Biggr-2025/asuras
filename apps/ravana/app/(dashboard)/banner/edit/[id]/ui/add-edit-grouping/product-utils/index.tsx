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
import { useGetBannerGroupDetails } from '../../../api/get-banner-group-details';
import { useUpdateBannerGroupProducts } from '../../../api/update-banner-group-products';
import { TableComponent } from './table';

export default function ProductUtils({
	bannerId,
	activeId,
}: {
	bannerId: string;
	activeId: string;
}) {
	const { data: bannerData, refetch } = useGetBannerGroupDetails(activeId, bannerId);
	const bannerGroup = useMemo(() => {
		return bannerData?.data?.group || ({} as ICatalougeTypes.IBannerImage);
	}, [bannerData?.data?.group]);
	const { mutateAsync: updateGroupImageProducts } = useUpdateBannerGroupProducts(bannerId);
	const [names, setNames] = useState<{ id: string; name: string }[]>([]);

	useEffect(() => {
		if (bannerGroup) {
			const tableData = bannerGroup.brands?.map((brand, index) => ({
				id: String(index),
				name: brand,
			}));
			setNames(tableData);
		}
	}, [bannerGroup]);

	const handleUtil = async (product: ICatalougeTypes.ICategory) => {
		const payload = {
			brands: [...bannerGroup.brands, product.name],
			bannerGroupId: activeId,
		};
		const response = await updateGroupImageProducts(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	const rowIds = names.map(({ name }) => name);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!active || !over || active.id === over.id) return;

		setNames((prevNames) => {
			const oldIndex = prevNames.findIndex((item) => item.id === active.id);
			const newIndex = prevNames.findIndex((item) => item.id === over.id);

			if (oldIndex === -1 || newIndex === -1) return prevNames;

			return arrayMove(prevNames, oldIndex, newIndex);
		});
	}

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="p-16">
				<div>
					<UtilsSearch type="BRAND" handleUtil={handleUtil} />
				</div>
				<TableComponent tableData={names} rowIds={rowIds} />
			</div>
		</DndContext>
	);
}
