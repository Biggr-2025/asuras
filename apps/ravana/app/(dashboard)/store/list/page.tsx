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

import { StoreListing, StoreListingContent, StoreListingHeader } from '../../../../core/ui';
import { AddEditStore } from './ui/form';
import ColumnsListing from './ui/table';

export default function Page() {
	const [show, setShow] = useState(false);

	return (
		<div className="size-full">
			<div className="h-full">
				<StoreListing
					apiKey="stores/list"
					showInactive={0}
					className="shadow-card1 rounded-8 m-16 bg-white"
				>
					<StoreListingHeader />
					<StoreListingContent>
						<ColumnsListing />
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
