'use client';

import {
	Button,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@asuras/ui';

import { IBannerImage } from '../../../../../../../../types';
import { useBannerImage } from './hook';
import { BannerImageUploader } from './upload-banner';

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
	image?: IBannerImage | null;
}) {
	const { files, getRootProps, getInputProps, handleSubmit, handleClear, isPending, isLoading } =
		useBannerImage({
			type,
			id,
			refetch,
			setUpdateImage,
			image,
		});

	return (
		<SheetContent side="bottom">
			<SheetHeader className="mb-24">
				<SheetTitle>{type === 'ADD' ? 'Add Image' : 'Edit Image'}</SheetTitle>
				<SheetDescription>You can upload only one image at a time</SheetDescription>
			</SheetHeader>

			{/* Image Upload UI */}
			<BannerImageUploader
				files={files}
				getRootProps={getRootProps}
				getInputProps={getInputProps}
				handleClear={handleClear}
			/>

			{/* Footer */}
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
