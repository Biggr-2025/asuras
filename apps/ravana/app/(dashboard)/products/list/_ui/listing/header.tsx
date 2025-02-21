import { cn } from '@asuras/utils';

import RowsPerPageSelect from './rows-per-page';
import SearchBar from './search';
import ToggleActiveButton from './toggle';

export function ProductListingHeader({ className }: { className?: string }) {
	return (
		<div className="shadow-card1 rounded-8 mb-12 bg-white">
			<div className={cn('flex items-center justify-between p-12', className)}>
				<SearchBar />
				<div className="flex flex-1 items-center justify-end gap-16">
					<ToggleActiveButton />
					<RowsPerPageSelect />
				</div>
			</div>
		</div>
	);
}
