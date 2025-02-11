import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlaceholder } from '@asuras/ui';
import { CloudUpload } from 'lucide-react';
import { useParams } from 'next/navigation';

import { createFormDataForImage } from '../../../../../../core/helpers';
import { useGetBannerById } from '../api/get-banner-by-id';
import { useUpdateBannerIcon } from '../api/update-icon';

export default function UpdateIcon() {
	const params = useParams();
	const { data, refetch } = useGetBannerById(params?.id as string);
	const url = data?.data?.banner?.iconUrl as string | null;
	const { mutateAsync: createBannerIcon } = useUpdateBannerIcon(params?.id as string);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			const formData = createFormDataForImage(acceptedFile as File, 'file');
			const response = await createBannerIcon(formData);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		});
	}, []);
	const accept: { [key: string]: string[] } = { 'image/*': [] };
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept,
	});

	return (
		<div className="rounded-8 shadow-card1 col-span-1 bg-white p-16">
			<div
				className="flex size-full cursor-pointer items-center justify-center"
				{...getRootProps()}
			>
				{url ? (
					<ImagePlaceholder
						src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${url}`}
						containerClasses="w-full h-full rounded-[12px] flex justify-center items-center flex-col gap-6 cursor-pointer"
						imageClasses="rounded-[12px] object-contain "
					/>
				) : (
					<div className="text-grey-3 flex flex-col items-center justify-center gap-6">
						<CloudUpload className="text-grey-3 size-[100px]" />
						<span>Upload Icon</span>
					</div>
				)}
				<input {...getInputProps()} />
			</div>
		</div>
	);
}
