import { ImagePlaceholder, Sheet } from '@asuras/ui';

import { IBannerImage } from '../../../../../../../../types';
import { BannerImageSheet } from '../sheet';
import { ImageItemAlert } from './alert';
import { ImageItemDropdown } from './dropdown';
import { useImageItem } from './hook';

interface IImageItemProps {
	image: IBannerImage;
	refetch: () => void;
	id: string;
	setShowForm: (b: boolean) => void;
	activeId: string | undefined;
	setActiveId: (id: string) => void;
	isImage: boolean;
	index: number;
}

export default function ImageItem({
	image,
	refetch,
	id,
	setShowForm,
	activeId,
	setActiveId,
	isImage,
	index,
}: IImageItemProps) {
	const {
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
	} = useImageItem({ image, refetch, id, setShowForm, setActiveId });

	return (
		<div
			className={`rounded-12 border-grey-light relative z-10 col-span-1 h-[182px] w-full border p-4 ${
				activeId === image._id ? 'border-primary shadow-card1 border-2' : ''
			}`}
			onClick={handleImageClick}
		>
			{/* Image or Group Name */}
			{isImage ? (
				<ImagePlaceholder
					src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
					containerClasses="w-full h-full rounded-[12px] flex justify-center items-center flex-col gap-6 cursor-pointer"
					imageClasses="rounded-[12px] object-cover"
				/>
			) : (
				<div className="flex h-full cursor-pointer items-center justify-center font-medium">
					Group-{index + 1}
				</div>
			)}

			{/* Dropdown Menu */}
			<ImageItemDropdown
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				isImage={isImage}
			/>

			{/* Alert Dialog for Deletion */}
			<ImageItemAlert
				isAlertOpen={isAlertOpen}
				setIsAlertOpen={setIsAlertOpen}
				handleDeleteConfirm={handleDeleteConfirm}
				handleCloseDialog={handleCloseDialog}
				isPending={isPending}
			/>

			{/* Sheet for Editing */}
			<Sheet open={show} onOpenChange={setShow}>
				<BannerImageSheet
					refetch={refetch}
					id={id}
					type="EDIT"
					setUpdateImage={setShow}
					image={image}
				/>
			</Sheet>
		</div>
	);
}
