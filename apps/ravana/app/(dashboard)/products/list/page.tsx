'use client';

import { ProductListing } from './_ui/listing';
import { ProductListingContent } from './_ui/listing/context';
import { ProductListingHeader } from './_ui/listing/header';
import ListingTable from './_ui/table';

export default function Page() {
	return (
		<div className="size-full p-16">
			<div className="h-full">
				<ProductListing showInactive={0} apiKey="products/list" className="">
					<ProductListingHeader />
					<ProductListingContent>
						<ListingTable />
					</ProductListingContent>
				</ProductListing>
			</div>
		</div>
	);
}
