'use client';

import {
	ProductUtilList,
	ProductUtilListingContent,
	ProductUtilListingHeader,
} from '../../../../core/ui/product-util/listing';
import ColumnsListing from '../_ui/columns';

export default function Page() {
	return (
		<div className="size-full p-16">
			<ProductUtilList apiKey="productUtil/list" type="BRAND" active={0} count={1}>
				<ProductUtilListingHeader />
				<ProductUtilListingContent>
					<ColumnsListing type="BRAND" />
				</ProductUtilListingContent>
			</ProductUtilList>
		</div>
	);
}
