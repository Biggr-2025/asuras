'use client';

import { useState } from 'react';
import { Button, Sheet } from '@asuras/ui';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useCreateBannerGroup } from '../../api/add-banner-group';
import { useGetBannerById } from '../../api/get-banner-by-id';
import EditImageDetails from '../form';
import ImageItem from './image-item';
import ProductsList from './products-list';
import { BannerImageSheet } from './sheet';

export default function AddEditGrouping() {
	const params = useParams();
	const { data, refetch } = useGetBannerById(params?.id as string);
	const [show, setShow] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [activeId, setActiveId] = useState<string | undefined>(undefined);
	const bannerData = data?.data?.banner || ({} as ICatalougeTypes.IBannerDetails);
	const { mutateAsync: createBannerGroup } = useCreateBannerGroup(params?.id as string);

	const handleMore = async () => {
		if (bannerData?.isImage) {
			setShow(true);
			setShowForm(false);
		} else {
			const response = await createBannerGroup(null);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	return (
		<div className="grid grid-cols-5 items-start gap-24">
			<div className="col-span-3">
				<div className="rounded-8 shadow-card1 grid grid-cols-3 gap-12 bg-white p-16">
					{data?.data?.banner?.groups?.map((image, i) => {
						return (
							<ImageItem
								image={image}
								key={image._id}
								refetch={refetch}
								id={params?.id as string}
								setShowForm={setShowForm}
								activeId={activeId}
								setActiveId={setActiveId}
								isImage={bannerData?.isImage}
								index={i}
							/>
						);
					})}
					<div className="col-span-1 h-[182px] w-full">
						<Button
							variant="outline"
							size="icon"
							className="rounded-12 flex h-[182px] w-full flex-col shadow-md"
							onClick={handleMore}
						>
							{bannerData?.isImage ? (
								<>
									<PlusIcon />
									<span className="text-14 font-semibold">Add More</span>
								</>
							) : (
								<>
									<PlusIcon />
									<span className="text-14 font-semibold">Add Group</span>
								</>
							)}
						</Button>
					</div>
					<Sheet open={show} onOpenChange={setShow}>
						<BannerImageSheet
							refetch={refetch}
							id={params?.id as string}
							type="ADD"
							setUpdateImage={setShow}
						/>
					</Sheet>
				</div>
				{showForm && (
					<div className="rounded-8 shadow-card1 col-span-3 mt-24 bg-white">
						<ProductsList
							bannerId={params?.id as string}
							activeId={activeId as string}
						/>
					</div>
				)}
			</div>
			{showForm && (
				<div className="rounded-8 shadow-card1 col-span-2 flex gap-24 bg-white">
					<EditImageDetails activeId={activeId as string} />
				</div>
			)}
		</div>
	);
}
