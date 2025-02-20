import { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	ImagePlaceholder,
	Spinner,
} from '@asuras/ui';
import { PlusIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useGetProductById } from '../../_api';
import ImageDeleteDialog from './delete-dialog';
import ImagesList from './list';
import PriorityUpdateForm from './priority-form';

const AddImageForm = dynamic(() => import('./add-image-form'), {
	loading: () => <span>Loading...</span>,
});

export default function ImagesContainer() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const imagesData = data?.data?.product?.images || [];
	const [show, setShow] = useState(false);
	const [showSheet, setShowSheet] = useState(false);
	const [imageId, setImageId] = useState<string | null>(null);

	const getImageUrl = (image: ICatalougeTypes.IProductImage) => {
		if (image.smallUrl && image.smallUrl !== '') {
			return image.smallUrl;
		} else if (image.mediumUrl && image.mediumUrl !== '') {
			return image.mediumUrl;
		} else if (image.largeUrl && image.largeUrl !== '') {
			return image.largeUrl;
		} else {
			return '';
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="rounded-8 shadow-card1 bg-white px-16">
			<AddImageForm
				open={showSheet}
				onChange={setShowSheet}
				id={params?.id as string}
				refetch={refetch}
			/>
			<Accordion className="" type="single" collapsible>
				{imagesData.map((image) => {
					return (
						<AccordionItem className="relative" key={image._id} value={image._id}>
							<AccordionTrigger
								onClick={() => setImageId(image._id)}
								className="text-muted-foreground"
							>
								{getImageUrl(image) ? (
									<ImagePlaceholder
										src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${getImageUrl(
											image
										)}`}
										containerClasses="w-[240px] h-[120px]"
										imageClasses="object-cover rounded-8"
									/>
								) : (
									''
								)}
							</AccordionTrigger>
							<AccordionContent className="relative">
								<ImageDeleteDialog
									open={show}
									setOpen={setShow}
									imageId={image._id}
									refetch={refetch}
									id={params?.id as string}
								/>
								<div className="">
									<ImagesList
										image={image}
										imageId={imageId}
										refetch={refetch}
										id={params?.id as string}
									/>
									<PriorityUpdateForm
										image={image}
										refetch={refetch}
										id={params?.id as string}
									/>
								</div>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
			<Button
				onClick={() => setShowSheet(true)}
				size="icon"
				className="size-54 fixed bottom-12 right-12 rounded-full"
			>
				<PlusIcon />
			</Button>
		</div>
	);
}
