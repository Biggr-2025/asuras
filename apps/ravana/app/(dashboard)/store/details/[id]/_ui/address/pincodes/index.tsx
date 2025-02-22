import { KeyboardEvent, useState } from 'react';
import { Input, Label, Spinner } from '@asuras/ui';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';

import { IStoreDetails } from '../../../../../../../../types';
import { useGetStoreDetails } from '../../../_api/get-store-details';
import { useUpdatePincodes } from './_api/update-pincodes';

export default function Pincodes() {
	const params = useParams();
	const [value, setValue] = useState('');
	const { data, refetch, isPending } = useGetStoreDetails(params?.id as string);
	const details = data?.data?.store || ({} as IStoreDetails);
	const { mutateAsync: updatePincodes } = useUpdatePincodes(params?.id as string);

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const newPincodes = value
				.split(',')
				.map((t) => t.trim())
				.filter((np) => np !== '');
			const payload = {
				pincodes: [...new Set([...details.pincodes, ...newPincodes])],
			};
			const response = await updatePincodes(payload);
			if (response.status === 'SUCCESS') {
				refetch();
				setValue('');
			}
		}
	};

	const handleDeletePincode = async (pincode: string) => {
		const filterPincodes = details?.pincodes.filter((newPincode) => newPincode !== pincode);
		const payload = {
			pincodes: filterPincodes,
		};
		const response = await updatePincodes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			setValue('');
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="rounded-8 py-18 shadow-card1 col-span-2 flex flex-col gap-16 bg-white px-16">
			<Label className="text-sm text-gray-700">
				Add multiple pincodes separated by commas (`,`) and press <strong>Enter</strong> to
				save.
			</Label>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Type pincodes, separated by commas, then press Enter..."
				type="numeric"
			/>
			<div className="flex flex-wrap gap-12">
				{details?.pincodes?.map((pincode, i) => {
					return (
						<div
							key={i}
							className="border-border bg-grey-1 inline-flex h-32 items-center justify-between gap-12 rounded-full border px-12"
						>
							<span className="text-grey-text2">{pincode}</span>
							<div
								onClick={() => handleDeletePincode(pincode)}
								className="cursor-pointer"
							>
								<X className="text-grey-3 !size-16" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
