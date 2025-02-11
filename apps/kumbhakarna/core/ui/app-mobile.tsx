'use client';

import { ImagePlaceholder } from '@asuras/ui';

export const AppMobile = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center space-y-16 bg-white py-20 text-center">
			<ImagePlaceholder
				containerClasses="w-[400px] h-[400px]"
				src="/images/maintainence.svg"
			/>
			<div className="mx-auto w-full max-w-[546px]">
				<p className="text-24 mb-12 font-semibold">
					🚫 This platform is only accessible on desktop devices. Please switch to a
					desktop for the best experience.
				</p>
			</div>
		</div>
	);
};
