'use client';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@asuras/ui';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const AddEditGrouping = dynamic(() => import('./ui/add-edit-grouping'), {
	loading: () => <Spinner />,
});

const UpdateIcon = dynamic(() => import('./ui/update-icon'), {
	loading: () => <Spinner />,
});

const AddEditBanner = dynamic(() => import('./ui/edit-banner').then((mod) => mod.AddEditBanner), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<div className="rounded-8 m-16">
			<Tabs value={type} onValueChange={handleChange} className="">
				<TabsList className="mb-12 w-full justify-start bg-white">
					<TabsTrigger className="flex-1 py-12" value="details">
						Edit Banner
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="images">
						Edit Groupinig
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0 grid grid-cols-3 gap-12" value="details">
					<AddEditBanner type="EDIT" />
					<UpdateIcon />
				</TabsContent>
				<TabsContent className="mt-0" value="images">
					<AddEditGrouping />
				</TabsContent>
			</Tabs>
		</div>
	);
}
