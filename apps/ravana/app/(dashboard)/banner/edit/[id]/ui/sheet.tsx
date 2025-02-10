/* eslint-disable max-lines-per-function */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Button,
	ImagePlaceholder,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@asuras/ui';
import { CloudUpload, X } from 'lucide-react';

import { createFormDataForImage } from '../../../../../../core/helpers';
import { useCreateBannerGroup } from '../api/add-banner-group';
import { useUpdateBannerGroupImage } from '../api/update-banner-group-image';

export function BannerImageSheet({
	type,
	id,
	refetch,
	setUpdateImage,
	image,
}: {
	type: 'ADD' | 'EDIT';
	id: string;
	refetch: () => void;
	setUpdateImage: (type: boolean) => void;
	image?: ICatalougeTypes.IBannerImage | null;
}) {
	const [files, setFiles] = useState<ICommonTypes.IFileWithPreview[]>([]);
	const { mutateAsync: createBannerGroup, isPending } = useCreateBannerGroup(id);
	const { mutateAsync: updateBanner, isPending: isLoading } = useUpdateBannerGroupImage(id);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		});
	}, []);
	const accept: { [key: string]: string[] } = { 'image/*': [] };
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept,
	});

	useEffect(() => {
		if (type === 'EDIT' && image) {
			setFiles([
				{
					preview: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`,
				} as ICommonTypes.IFileWithPreview,
			]);
		}
	}, [image, type]);

	const handleSubmit = async () => {
		if (type === 'ADD') {
			const formData = createFormDataForImage(files[0] as File, 'file');
			const response = await createBannerGroup(formData);
			if (response.status === 'SUCCESS') {
				refetch();
				setUpdateImage(false);
				setFiles([]);
			}
		} else {
			if (image) {
				const formData = createFormDataForImage(files[0] as File, 'file', {
					bannerGroupId: image?._id,
				});
				const response = await updateBanner(formData);
				if (response.status === 'SUCCESS') {
					refetch();
					setUpdateImage(false);
					setFiles([]);
				}
			}
		}
	};

	const handleClear = (event: React.MouseEvent) => {
		event.stopPropagation();
		setFiles([]);
	};

	return (
		<SheetContent side="bottom">
			<SheetHeader className="mb-24">
				<SheetTitle>{type === 'ADD' ? 'Add Image' : 'Edit Image'}</SheetTitle>
				<SheetDescription>You can upload only one image at a time</SheetDescription>
			</SheetHeader>
			<div className="relative mx-auto max-w-screen-lg">
				{files.length > 0 && (
					<div
						onClick={handleClear}
						className="z-3 shadow-card1 absolute -right-12 -top-12 flex size-24 cursor-pointer items-center justify-center rounded-full border bg-white"
					>
						<X className="text-destructive size-16" />
					</div>
				)}
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					{files.length > 0 ? (
						files.map((file, i) => (
							<ImagePlaceholder
								key={i}
								src={file.preview}
								containerClasses="h-[320px] w-full"
								imageClasses="object-contain rounded-12"
							/>
						))
					) : (
						<div className="flex h-[320px] w-full cursor-pointer items-center justify-center">
							<div className="text-grey-3 flex flex-col items-center justify-center gap-6">
								<CloudUpload className="text-grey-3 size-[100px]" />
								<span>Upload Icon</span>
							</div>
						</div>
					)}
				</div>
			</div>
			<SheetFooter className="mt-24">
				<SheetClose asChild>
					<Button className="w-[180px]" variant="outline">
						Close
					</Button>
				</SheetClose>
				<Button
					onClick={handleSubmit}
					disabled={files.length <= 0 || isPending || isLoading}
					className="w-[180px]"
					loading={isPending || isLoading}
				>
					Submit
				</Button>
			</SheetFooter>
		</SheetContent>
	);
}
