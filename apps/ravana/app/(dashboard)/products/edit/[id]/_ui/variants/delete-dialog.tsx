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
import { Trash2Icon } from 'lucide-react';

export default function VariantDeleteDialog({ handleDelete }: { handleDelete: () => void }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger className="flex w-full items-center gap-12 py-12" asChild>
				<Button size="icon" variant="ghost">
					<Trash2Icon className="!size-18 text-red-1" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="gap-24">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-24">Remove Variant?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to remove this variant from the product?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!pt-32">
					<AlertDialogCancel>
						<span className="text-14 font-normal">Cancel</span>
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
