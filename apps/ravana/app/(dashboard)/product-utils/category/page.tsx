'use client';

import { ProductUtilList } from '../_ui/listing';
import { ProductUtilListingContent } from '../_ui/listing/content';
import { ProductUtilListingHeader } from '../_ui/listing/header';
import { ProductUtilsTable } from '../_ui/table';

export default function Page() {
	return (
		<div className="size-full p-16">
			<ProductUtilList apiKey="productUtil/list" type="CATEGORY" active={0} count={1}>
				<ProductUtilListingHeader />
				<ProductUtilListingContent>
					<ProductUtilsTable type="CATEGORY" />
				</ProductUtilListingContent>
			</ProductUtilList>
		</div>
	);
}
