import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator,
} from '@asuras/ui';
import { EllipsisVertical, PencilIcon, Trash2Icon } from 'lucide-react';

export function ImageItemDropdown({
	handleEdit,
	handleDelete,
	isImage,
}: {
	handleEdit: (event: React.MouseEvent) => void;
	handleDelete: (event: React.MouseEvent) => void;
	isImage: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="z-3 shadow-card1 rounded-tr-12 rounded-bl-12 absolute right-0 top-0 flex size-32 items-center justify-center bg-white">
				<EllipsisVertical className="size-16" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{isImage && (
					<>
						<DropdownMenuItem
							onClick={handleEdit}
							className="flex cursor-pointer gap-8"
						>
							<PencilIcon className="!size-16" />
							<span>Edit</span>
						</DropdownMenuItem>
						<Separator />
					</>
				)}
				<DropdownMenuItem onClick={handleDelete} className="flex cursor-pointer gap-8">
					<Trash2Icon className="text-red-1 !size-16" />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
