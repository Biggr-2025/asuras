import { useState } from 'react';
import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@asuras/ui';

export default function PickType({
	setShowSelect,
}: {
	setShowSelect: (
		s: 'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | null
	) => void;
}) {
	const [value, setValue] = useState<
		'brands' | 'categories' | 'departments' | 'productIds' | 'subCategories' | ''
	>('');

	const handleSubmit = () => {
		if (value) {
			setShowSelect(value);
		}
	};

	return (
		<div className="flex items-end gap-16 p-16">
			<div>
				<Label>Please choose a type to proceed</Label>
				<Select
					value={value}
					onValueChange={(
						val:
							| 'brands'
							| 'categories'
							| 'departments'
							| 'productIds'
							| 'subCategories'
					) => {
						setValue(val);
					}}
				>
					<SelectTrigger className="mt-12 w-[180px]">
						<SelectValue placeholder="Select Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="brands">Brands</SelectItem>
						<SelectItem value="categories">Categories</SelectItem>
						<SelectItem value="departments">Departments</SelectItem>
						<SelectItem value="productIds">Product Ids</SelectItem>
						<SelectItem value="subCategories">Sub Categories</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button onClick={handleSubmit} disabled={value === ''} className="w-[180px]">
				Submit
			</Button>
		</div>
	);
}
