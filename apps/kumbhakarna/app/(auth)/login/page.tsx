'use client';

import { AspectRatio, ImagePlaceholder } from '@asuras/ui';

export default function Page() {
	return (
		<AspectRatio className="h-full lg:p-24" ratio={16 / 9}>
			<ImagePlaceholder
				src="/images/bg1.jpeg"
				containerClasses="h-full"
				imageClasses="object-cover rounded-16"
			/>
		</AspectRatio>
	);
}
