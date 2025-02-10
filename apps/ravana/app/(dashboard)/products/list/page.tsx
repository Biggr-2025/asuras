'use client';

import { ProductListing, ProductListingContent, ProductListingHeader } from '../../../../core/ui';
import ColumnsListing from './ui/table';

export default function Page() {
	return (
		<div className="size-full p-16">
			<div className="h-full">
				<ProductListing showInactive={0} apiKey="products/list" className="">
					<ProductListingHeader />
					<ProductListingContent>
						<ColumnsListing />
					</ProductListingContent>
				</ProductListing>
			</div>
		</div>
	);
}
