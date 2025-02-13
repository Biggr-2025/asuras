'use client';

import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlaceholder } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { useParams } from 'next/navigation';

import { createFormDataForImage } from '../../../../../../../core/helpers';
import { useUpdateUtilType } from '../_api/update-image';

export default function Item({
	item,
	defaultImage,
	refetch,
}: {
	item: { label: string; name: string };
	defaultImage: string | boolean | null;
	refetch: () => void;
}) {
	const params = useParams();
	const { mutateAsync: updateUtilType } = useUpdateUtilType(params?.name as string);

	const accept: { [key: string]: string[] } = { 'image/*': [] };

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			const formData = createFormDataForImage(acceptedFile as File, 'file', {
				utilType: params?.type,
				imageType: item?.name,
			});
			const response = await updateUtilType(formData);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept,
	});

	const classess = useMemo(() => {
		switch (item.name) {
			case 'ICON':
				return 'w-[54px] h-[54px]';
			case 'SMALL':
				return 'w-[92px] h-[92px]';
			case 'MEDIUM':
				return 'w-[192px] h-[192px]';
			default:
				return 'w-[292px] h-[292px]';
		}
	}, [item.name]);

	return (
		<div {...getRootProps()} className={cn(classess)}>
			<input {...getInputProps()} />
			<div className="rounded-8 shadow-card1 size-full cursor-pointer bg-white">
				{defaultImage && (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${defaultImage}`}
						containerClasses="size-full rounded-8 cursor-pointer"
						imageClasses="object-cover rounded-8"
					/>
				)}
			</div>
			<p className="mt-6 block w-full text-center">{item.label}</p>
		</div>
	);
}
