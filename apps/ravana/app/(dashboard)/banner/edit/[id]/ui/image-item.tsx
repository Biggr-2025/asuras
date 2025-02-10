import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	ImagePlaceholder,
	Separator,
	Sheet,
} from '@asuras/ui';
import { EllipsisVertical, PencilIcon, Trash2Icon } from 'lucide-react';

import { useDeleteBannerGroup } from '../api/remove-banner-group';
import { BannerImageSheet } from './sheet';

interface IImageItemProps {
	image: ICatalougeTypes.IBannerImage;
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

	const handleImageClick = async (event: React.MouseEvent) => {
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

	return (
		<div
			className={`border-grey-light relative z-10 col-span-1 h-[182px] w-full rounded-[12px] border p-4 ${
				activeId === image._id ? 'border-primary shadow-card1 border-2' : ''
			}`}
			onClick={handleImageClick}
		>
			{isImage ? (
				<ImagePlaceholder
					src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`}
					containerClasses="w-full h-full rounded-[12px] flex justify-center items-center flex-col gap-6 cursor-pointer"
					imageClasses="rounded-[12px] object-cover "
				/>
			) : (
				<div className="flex h-full cursor-pointer items-center justify-center font-medium">
					Group-{index + 1}
				</div>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger className="z-3 shadow-card1 rounded-tr-12 rounded-bl-12 absolute right-0 top-0 flex size-32 items-center justify-center bg-white">
					<EllipsisVertical className="size-16" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					{isImage && (
						<>
							<DropdownMenuItem
								onClick={handleEdit}
								className="flex cursor-pointer gap-8"
							>
								<PencilIcon className="!size-16" />
								<span>Edit</span>
							</DropdownMenuItem>
							<Separator />
						</>
					)}
					<DropdownMenuItem onClick={handleDelete} className="flex cursor-pointer gap-8">
						<Trash2Icon className="text-red-1 !size-16" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">Remove Banner?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove this banner.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogCancel onClick={handleCloseDialog}>
							<span className="text-14 font-normal">Cancel</span>
						</AlertDialogCancel>
						<AlertDialogAction disabled={isPending} onClick={handleDeleteConfirm}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
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
