import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	ImagePlaceholder,
	Spinner,
} from '@asuras/ui';
import { CloudUpload } from 'lucide-react';
import Link from 'next/link';

import { createFormDataForDocument, createFormDataForImage } from '../../../../../../core/helpers';
import { useGetStoreDocs } from '../api/get-store-docs';
import { useUploadStoreDocs } from '../api/upload-store-docs';

export default function StoreUpload({
	storeType,
	stroreId,
	value,
}: {
	storeType: { label: string; value?: string };
	stroreId: string;
	value: string;
}) {
	const { data, refetch, isRefetching } = useGetStoreDocs(
		stroreId,
		storeType.label,
		storeType.value,
		storeType.label === value
	);
	const { mutateAsync: uploadStoreDocs } = useUploadStoreDocs(stroreId);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			if (acceptedFile.type === 'application/pdf') {
				const formData = createFormDataForDocument(acceptedFile as File, 'file', {
					type: storeType.label,
				});
				const response = await uploadStoreDocs(formData);
				if (response.status === 'SUCCESS') {
					refetch();
				}
			} else {
				const formData = createFormDataForImage(acceptedFile as File, 'file', {
					type: storeType.label,
				});
				const response = await uploadStoreDocs(formData);
				if (response.status === 'SUCCESS') {
					refetch();
				}
			}
		});
	}, []);
	const accept: { [key: string]: string[] } =
		value === 'LOGO' ? { 'image/*': [] } : { 'image/*': [], 'application/pdf': [] };

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept,
	});

	const renderTitle = useMemo(() => {
		const titleMap: Record<string, string> = {
			LOGO: 'Store Logo',
			GST: 'GST Document',
			PAN: 'PAN Document',
			OTHER: 'Other Documents',
		};
		return titleMap[storeType.label];
	}, [storeType.label]);
	const docPdfType = data?.data?.docUrl?.includes('.pdf');

	if (isRefetching) {
		return <Spinner />;
	}

	return (
		<AccordionItem className="px-12" value={storeType.label}>
			<AccordionTrigger>{renderTitle}</AccordionTrigger>
			<AccordionContent>
				<div className="grid grid-cols-2 gap-24">
					{data?.data?.docUrl && (
						<div className="border-grey-divider rounded-12 col-span-1 border">
							{docPdfType ? (
								<Link
									className="flex h-full items-center justify-center"
									target="_blank"
									href={data?.data?.docUrl}
								>
									<ImagePlaceholder
										src="/images/pdf-file.svg"
										containerClasses="w-full h-[180px]"
										imageClasses="rounded-12 object-contain"
									/>
								</Link>
							) : (
								<ImagePlaceholder
									src={data?.data?.docUrl}
									containerClasses="w-full h-[300px]"
									imageClasses="rounded-12 object-contain"
								/>
							)}
						</div>
					)}
					<div className="border-grey-divider rounded-12 col-span-1 flex h-[300px] items-center justify-center  border">
						<div
							className="flex size-full cursor-pointer flex-col items-center justify-center"
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<CloudUpload className="size-32" />
							<p className="text-14">
								{data?.data?.docUrl ? 'Update the document' : 'Add document'}
							</p>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
