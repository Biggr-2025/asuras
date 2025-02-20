import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
} from '@asuras/ui';
import { TrashIcon } from 'lucide-react';

import { useRemoveProductImage } from './_api/remove-product-image';

export default function ImageDeleteDialog({
	open,
	setOpen,
	imageId,
	refetch,
	id,
}: {
	open: boolean;
	setOpen: (val: boolean) => void;
	imageId: string;
	refetch: () => void;
	id: string;
}) {
	const { mutateAsync: removeProductImage } = useRemoveProductImage(id);

	const handleDelete = async () => {
		const payload = {
			productImageId: imageId,
		};
		const response = await removeProductImage(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			setOpen(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className="absolute right-0 z-50" variant="destructive" size="sm">
					<TrashIcon className="!size-16" />
					<span className="text-14">Delete</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. It will permanently delete this image.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
