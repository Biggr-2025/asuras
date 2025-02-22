'use client';

import { useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@asuras/ui';
import { PlusIcon } from 'lucide-react';

import { AddEditStore } from './_ui/form';
import { StoreListing } from './_ui/listing';
import { StoreListingContent } from './_ui/listing/content';
import { StoreListingHeader } from './_ui/listing/header';
import { StoreListingTable } from './_ui/table';

export default function Page() {
	const [show, setShow] = useState(false);

	return (
		<div className="size-full">
			<div className="h-full">
				<StoreListing
					apiKey="stores/list"
					className="shadow-card1 rounded-8 m-16 bg-white p-12"
				>
					<StoreListingHeader />
					<StoreListingContent>
						<StoreListingTable />
					</StoreListingContent>
					<Sheet open={show} onOpenChange={setShow}>
						<SheetTrigger className="bg-primary fixed bottom-12 right-12 flex size-[54px] cursor-pointer items-center justify-center gap-8 rounded-full px-12 py-8 text-white shadow-lg">
							<PlusIcon className="size-24" />
						</SheetTrigger>
						<SheetContent side="bottom">
							<SheetHeader>
								<SheetTitle>Add a new Store</SheetTitle>
								<SheetDescription></SheetDescription>
								<AddEditStore setShow={setShow} />
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</StoreListing>
			</div>
		</div>
	);
}
