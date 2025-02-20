'use client';

import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@asuras/ui';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { EditProductProvider } from './_context/edit-product';

const ProductForm = dynamic(() => import('../../_ui/form').then((mod) => mod.ProductForm), {
	loading: () => <Spinner />,
	ssr: false,
});

const AddEditAttributes = dynamic(() => import('./_ui/attributes'), {
	loading: () => <Spinner />,
});

const ImagesContainer = dynamic(() => import('./_ui/upload-images'), {
	loading: () => <Spinner />,
});

const Varaints = dynamic(() => import('./_ui/variants'), {
	loading: () => <Spinner />,
});

const Tags = dynamic(() => import('./_ui/tags/tags'), {
	loading: () => <Spinner />,
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
			<Tabs className="" value={type} onValueChange={handleChange}>
				<TabsList className="mb-12 w-full justify-start bg-white">
					<TabsTrigger className="flex-1 py-12" value="product">
						Details
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="tags">
						Tags
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="images">
						Product Images
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="attributes">
						Attributes
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="variants">
						Variants
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0" value="product">
					<ProductForm type="EDIT" />
				</TabsContent>
				<TabsContent className="mt-0" value="tags">
					<Tags />
				</TabsContent>
				<TabsContent className="mt-0" value="images">
					<ImagesContainer />
				</TabsContent>
				<TabsContent className="mt-0" value="attributes">
					<EditProductProvider>
						<AddEditAttributes />
					</EditProductProvider>
				</TabsContent>
				<TabsContent className="mt-0" value="variants">
					<Varaints />
				</TabsContent>
			</Tabs>
		</div>
	);
}
