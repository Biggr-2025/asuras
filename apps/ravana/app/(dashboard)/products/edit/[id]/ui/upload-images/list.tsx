import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlaceholder } from '@asuras/ui';
import { cn } from '@asuras/utils';

import { createFormDataForImage } from '../../../../../../../core/helpers';
import { useUpdateProductImage } from '../../api';

interface ImageListProps {
	image: ICatalougeTypes.IProductImage;
	imageId: string | null;
	refetch: () => void;
	id: string;
}

export default function ImagesList({ image, imageId, refetch, id }: ImageListProps) {
	return (
		<div className="flex flex-col gap-6 bg-white" key={image._id}>
			<div className="relative flex items-center gap-12">
				{[
					{ label: 'Small', name: 'SMALL', type: 'smallUrl' },
					{ label: 'Medium', name: 'MEDIUM', type: 'mediumUrl' },
					{ label: 'Large', name: 'LARGE', type: 'largeUrl' },
				].map((item) => (
					<Item
						key={item.name}
						refetch={refetch}
						item={item}
						image={image[item.type as keyof ICatalougeTypes.IProductImage]}
						id={id}
						imageId={imageId}
					/>
				))}
			</div>
		</div>
	);
}

interface ItemProps {
	refetch: () => void;
	image: string | number | boolean;
	item: {
		label: string;
		name: string;
		type: string;
	};
	id: string;
	imageId: string | null;
}

const Item = ({ refetch, image, item, id, imageId }: ItemProps) => {
	const { mutateAsync: uploadImage } = useUpdateProductImage(id as string);

	const accept: { [key: string]: string[] } = { 'image/*': [] };

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			for (const acceptedFile of acceptedFiles) {
				const formData = createFormDataForImage(acceptedFile, 'file', {
					imageType: item.name,
					productImageId: imageId,
				});
				const response = await uploadImage(formData);
				if (response?.status === 'SUCCESS') {
					refetch();
				}
			}
		},
		[item.name, imageId, uploadImage, refetch]
	);

	const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

	const classess = useMemo(() => {
		switch (item.name) {
			case 'SMALL':
				return 'w-[92px] h-[92px]';
			case 'MEDIUM':
				return 'w-[192px] h-[192px]';
			default:
				return 'w-[292px] h-[292px]';
		}
	}, [item.name]);

	return (
		<div {...getRootProps()} className={cn('mb-16 cursor-pointer', classess)}>
			<input {...getInputProps()} />
			<div className="rounded-8 shadow-card1 flex size-full cursor-pointer items-center justify-center bg-white p-12">
				{image && (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image}`}
						containerClasses="w-full h-full rounded-8 cursor-pointer"
						imageClasses="object-cover rounded-8"
					/>
				)}
			</div>
			<p className="mt-4 text-center text-sm font-medium">{item.label}</p>
		</div>
	);
};
