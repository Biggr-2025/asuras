import { ImagePlaceholder } from '@asuras/ui';
import { CloudUpload, X } from 'lucide-react';

export function BannerImageUploader({
	files,
	getRootProps,
	getInputProps,
	handleClear,
}: {
	files: ICommonTypes.IFileWithPreview[];
	getRootProps: () => any;
	getInputProps: () => any;
	handleClear: (event: React.MouseEvent) => void;
}) {
	return (
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
	);
}
