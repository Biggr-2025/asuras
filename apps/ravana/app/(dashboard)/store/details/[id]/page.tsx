'use client';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@asuras/ui';
import dynamic from 'next/dynamic';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

const Documents = dynamic(() => import('./_ui/documents'), {
	loading: () => <Spinner />,
});

const Listing = dynamic(() => import('./_ui/listing'), {
	loading: () => <Spinner />,
});

const BusinessDetails = dynamic(() => import('./_ui/business-details'), {
	loading: () => <Spinner />,
});

const BasicDetails = dynamic(() => import('./_ui/basic-details'), {
	loading: () => <Spinner />,
});

const Address = dynamic(() => import('./_ui/address'), {
	loading: () => <Spinner />,
});

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const searchparams = useSearchParams();
	const type = searchparams.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<Tabs className="m-16" value={type} onValueChange={handleChange}>
			<TabsList className="mb-12 w-full justify-start bg-white">
				<TabsTrigger className="text-14 flex-1 py-12" value="details">
					Basic Details
				</TabsTrigger>
				<TabsTrigger className="text-14 flex-1 py-12" value="business">
					Business Details
				</TabsTrigger>
				<TabsTrigger className="text-14 flex-1 py-12" value="documents">
					Documents
				</TabsTrigger>
				<TabsTrigger className="text-14 flex-1 py-12" value="address">
					Address
				</TabsTrigger>
				<TabsTrigger className="text-14 flex-1 py-12" value="products">
					Products List
				</TabsTrigger>
			</TabsList>
			<TabsContent className="mt-0" value="details">
				<BasicDetails id={params?.id as string} />
			</TabsContent>
			<TabsContent className="mt-0" value="business">
				<BusinessDetails id={params?.id as string} />
			</TabsContent>
			<TabsContent className="mt-0" value="documents">
				<Documents id={params?.id as string} />
			</TabsContent>
			<TabsContent className="mt-0" value="address">
				<Address />
			</TabsContent>
			<TabsContent className="mt-0" value="products">
				<Listing />
			</TabsContent>
		</Tabs>
	);
}
