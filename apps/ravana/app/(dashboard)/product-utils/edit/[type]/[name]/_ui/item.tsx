'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@asuras/utils';
import { useParams } from 'next/navigation';

import { createFormDataForImage } from '../../../../../../../core/helpers';
import { useUpdateUtilType } from '../_api/update-image';

export default function Item({ item }: { item: { label: string; name: string } }) {
	const params = useParams();
	const [files, setFiles] = useState<ICommonTypes.IFileWithPreview[]>([]);
	const { mutateAsync: updateUtilType } = useUpdateUtilType(
		decodeURIComponent(params?.name as string)
	);

	const accept: { [key: string]: string[] } = { 'image/*': [] };

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			const formData = createFormDataForImage(acceptedFile as File, 'file', {
				utilType: params?.type,
				imageType: item?.name,
			});
			const response = await updateUtilType(formData);
			console.log(response);

			// setFiles(
			//     acceptedFiles.map((file) =>
			//         Object.assign(file, {
			//             preview: URL.createObjectURL(file),
			//         })
			//     )
			// );
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
			<div className="shadow-card1 rounded-8 size-full cursor-pointer bg-white"></div>
			<p className="mt-6 block w-full text-center">{item.label}</p>
		</div>
	);
}
