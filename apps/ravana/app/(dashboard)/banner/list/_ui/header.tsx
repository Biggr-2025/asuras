import { memo, useCallback } from 'react';
import { Button, Input } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { Search, X } from 'lucide-react';

function Header({ value, onChange }: { value: string; onChange: (term: string) => void }) {
	const handleClear = useCallback(() => {
		onChange('');
	}, [onChange]);

	return (
		<div className="flex justify-between border-b p-12">
			<div className="relative flex w-[520px] items-center border-b px-12">
				<Search className="mr-12 size-16 shrink-0 opacity-50" />
				<Input
					className={cn(
						'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50'
					)}
					type="search"
					placeholder="Search for banners..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				{value.length > 0 && (
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
						onClick={handleClear}
					>
						<X className="text-red-1 !size-16" />
					</Button>
				)}
			</div>
		</div>
	);
}

export default memo(Header);
