import { Button, Input } from '@asuras/ui';
import { Search, X } from 'lucide-react';

import { useProductListingContext } from '../../_context';

export default function SearchBar() {
	const { value, handleSearchChange } = useProductListingContext();

	return (
		<div className="relative flex w-[320px] items-center border-b px-12">
			<Search className="mr-12 size-16 opacity-50" />
			<Input
				className="text-14 flex h-32 w-full border-none bg-transparent pl-0 font-medium outline-none"
				type="search"
				placeholder="Search for products..."
				value={value}
				onChange={(e) => handleSearchChange(e.target.value)}
			/>
			{value.length > 0 && (
				<Button
					size="icon"
					variant="ghost"
					className="absolute right-6 top-1/2 -translate-y-1/2"
					onClick={() => handleSearchChange('')}
				>
					<X className="text-red-1 !size-16" />
				</Button>
			)}
		</div>
	);
}
