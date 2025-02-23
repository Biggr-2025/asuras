import { ReactNode } from 'react';
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@asuras/ui';
import { cn } from '@asuras/utils';
import { Search, X } from 'lucide-react';

import { useProductUtilsListContext } from '../../_context';

interface IProductUtilListHeaderProps {
	className?: string;
	children?: ReactNode;
}

export const ProductUtilListingHeader = ({ className }: IProductUtilListHeaderProps) => {
	const { value, handleSearchChange, pagination, setPagination } = useProductUtilsListContext();

	const handleRowChange = (newRow: string) => {
		setPagination({
			pageIndex: 0,
			pageSize: Number(newRow),
		});
	};

	return (
		<div className="rounded-8 shadow-card1 mb-12 bg-white">
			<div className={cn('flex items-center justify-between p-12', className)}>
				<div className="flex-1">
					<div className="relative flex w-[320px] items-center border-b px-12">
						<Search className="mr-12 size-16 shrink-0 opacity-50" />
						<Input
							className={cn(
								'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50',
								className
							)}
							type="search"
							placeholder="Search for products..."
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleSearchChange(e.target.value)
							}
						/>
						{value.length > 0 && (
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
								onClick={() => handleSearchChange('')}
							>
								<X className="text-red-1 !size-16" />
							</Button>
						)}
					</div>
				</div>
				<div className="flex flex-1 justify-end">
					<div className="flex items-center gap-4">
						<span className="whitespace-nowrap text-sm">Rows per page: </span>
						<Select
							value={pagination.pageSize.toString()}
							onValueChange={(value) => handleRowChange(value)}
						>
							<SelectTrigger className="h-40 max-w-[80px] py-0">
								<SelectValue placeholder="Select page size">
									{String(pagination.pageSize)}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{[15, 30, 50].map((option) => (
									<SelectItem key={option} value={String(option)}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};
