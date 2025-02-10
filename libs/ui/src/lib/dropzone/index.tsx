'use client';

import { useDropzone } from 'react-dropzone';
import { CloudUpload } from 'lucide-react';

import { ImagePlaceholder } from '../image';

type IFileWithPreview = File & { preview: string };

interface IProps {
	files: IFileWithPreview[];
	setFiles: (files: IFileWithPreview[]) => void;
	maxFiles?: number;
	acceptTypes?: { [key: string]: string[] };
	onSubmit?: () => void;
}

export const DropZone = ({
	files,
	setFiles,
	maxFiles = 1,
	acceptTypes = {
		'image/*': [],
	},
	onSubmit,
}: IProps) => {
	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		accept: acceptTypes,
		maxFiles,
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
			if (onSubmit) {
				onSubmit();
			}
		},
	});

	return (
		<div className="flex-1">
			<div className="border-grey-divider rounded-12 flex h-[300px] w-full flex-col items-center justify-center border border-dashed py-16 text-center ">
				{files.length === 0 && (
					<div
						{...getRootProps({
							className:
								'dropzone flex flex-col gap-12 justify-center items-center w-full h-full cursor-pointer',
						})}
					>
						<input className="hidden" {...getInputProps()} />
						<CloudUpload className="size-54 text-grey-text3" />
						{isDragAccept ? (
							<p className="text-14  text-grey-text3">Drop the files here ...</p>
						) : (
							<p className="text-14  text-grey-text3">
								Drop files here or click to upload.
							</p>
						)}
					</div>
				)}
				<div className="flex w-full items-center justify-center">
					{files.map((file, i) => (
						<ImagePlaceholder
							key={i}
							src={file.preview}
							containerClasses="h-[290px] w-full"
							imageClasses="object-cover rounded-12"
						/>
					))}
				</div>
			</div>
		</div>
	);
};
