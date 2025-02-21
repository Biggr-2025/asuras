import { useState } from 'react';

import { IBannerImage } from '../../../../../../../../types';
import { useDeleteBannerGroup } from '../../../_api/remove-banner-group';

interface UseImageItemProps {
	image: IBannerImage;
	refetch: () => void;
	id: string;
	setShowForm: (b: boolean) => void;
	setActiveId: (id: string) => void;
}

export function useImageItem({ image, refetch, id, setShowForm, setActiveId }: UseImageItemProps) {
	const { mutateAsync: deleteBannerGroup, isPending } = useDeleteBannerGroup(id as string);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [show, setShow] = useState(false);

	const handleDeleteConfirm = async (event: React.MouseEvent) => {
		event.stopPropagation();
		const response = await deleteBannerGroup({ bannerGroupId: image._id });
		if (response.status === 'SUCCESS') {
			refetch();
			setShowForm(false);
		}
	};

	const handleImageClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setShowForm(true);
		setActiveId(image._id);
	};

	const handleDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsAlertOpen(true);
	};

	const handleEdit = (event: React.MouseEvent) => {
		event.stopPropagation();
		setShow(true);
	};

	const handleCloseDialog = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsAlertOpen(false);
	};

	return {
		show,
		setShow,
		isAlertOpen,
		setIsAlertOpen,
		isPending,
		handleDeleteConfirm,
		handleImageClick,
		handleDelete,
		handleEdit,
		handleCloseDialog,
	};
}
