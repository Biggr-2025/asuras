import { KeyboardEvent, useMemo, useState } from 'react';
import { Input, Label, Spinner } from '@asuras/ui';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useGetProductById } from '../../_api';
import useUpdateProductTags from './_api/update-tags';

export default function Tags() {
	const params = useParams();
	const { data, refetch, isPending } = useGetProductById(params?.id as string);
	const productData = useMemo(() => {
		return data?.data?.product || ({} as ICatalougeTypes.IProduct);
	}, [data?.data?.product]);
	const { mutateAsync: updateProductTags } = useUpdateProductTags(params?.id as string);
	const [value, setValue] = useState('');

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const newTags = value
				.split(',')
				.map((t) => t.trim())
				.filter((nt) => nt !== '');
			const payload = {
				tags: [...new Set([...productData.tags, ...newTags])],
			};
			const response = await updateProductTags(payload);
			if (response.status === 'SUCCESS') {
				refetch();
				setValue('');
			}
		}
	};

	const handleDeleteTag = async (tag: string) => {
		const filterTags = productData.tags.filter((newTag) => newTag !== tag);
		const payload = {
			tags: filterTags,
		};
		const response = await updateProductTags(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			setValue('');
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="rounded-8 py-18 shadow-card1 flex max-w-[720px] flex-col gap-16 bg-white px-16">
			<Label className="text-sm text-gray-700">
				Add multiple tags separated by commas (`,`) and press <strong>Enter</strong> to
				save.
			</Label>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Type tags, separated by commas, then press Enter..."
			/>
			<div className="flex gap-12">
				{productData?.tags?.map((tag, i) => {
					return (
						<div
							key={i}
							className="border-border bg-grey-1 inline-flex h-32 items-center justify-between gap-12 rounded-full border px-12"
						>
							<span className="text-grey-text2">{tag}</span>
							<div onClick={() => handleDeleteTag(tag)} className="cursor-pointer">
								<X className="text-grey-3 !size-16" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
