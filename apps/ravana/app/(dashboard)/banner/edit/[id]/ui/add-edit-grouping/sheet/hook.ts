import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { createFormDataForImage } from '../../../../../../../../core/helpers';
import { useCreateBannerGroup } from '../../../api/add-banner-group';
import { useUpdateBannerGroupImage } from '../../../api/update-banner-group-image';

export function useBannerImage({
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

	// Handle file drop
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	// Set existing image when editing
	useEffect(() => {
		if (type === 'EDIT' && image) {
			setFiles([
				{
					preview: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image.url}`,
				} as ICommonTypes.IFileWithPreview,
			]);
		}
	}, [image, type]);

	// Handle image submission
	const handleSubmit = async () => {
		if (!files.length) return;

		const formData = createFormDataForImage(
			files[0] as File,
			'file',
			type === 'EDIT' && image ? { bannerGroupId: image?._id } : undefined
		);

		const response =
			type === 'ADD' ? await createBannerGroup(formData) : await updateBanner(formData);

		if (response.status === 'SUCCESS') {
			refetch();
			setUpdateImage(false);
			setFiles([]);
		}
	};

	// Handle clearing selected image
	const handleClear = (event: React.MouseEvent) => {
		event.stopPropagation();
		setFiles([]);
	};

	const accept: { [key: string]: string[] } = { 'image/*': [] };
	const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

	return { files, getRootProps, getInputProps, handleSubmit, handleClear, isPending, isLoading };
}
