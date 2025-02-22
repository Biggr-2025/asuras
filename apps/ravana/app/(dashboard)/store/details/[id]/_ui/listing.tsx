'use client';

import { useParams } from 'next/navigation';

import { StoreProductsListing } from './store-products/listing/_ui';
import { StoreProductsListingContent } from './store-products/listing/_ui/context';
import { StoreProductsListingHeader } from './store-products/listing/_ui/header';
import { StoreProductTable } from './store-products/table';

export default function Listing() {
	const params = useParams();

	return (
		<div className="size-full">
			<div className="h-full">
				<StoreProductsListing
					apiKey="store/products/list"
					showInactive={1}
					storeId={params?.id as string}
					className="rounded-8 shadow-card1 bg-white"
				>
					<StoreProductsListingHeader />
					<StoreProductsListingContent>
						<StoreProductTable />
					</StoreProductsListingContent>
				</StoreProductsListing>
			</div>
		</div>
	);
}
