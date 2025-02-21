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
import { Trash2 } from 'lucide-react';

import { ISpecifications } from '../../../../../../../types';
import { useRemoveProductAttributes } from './_api/remove-product-attributes';

export default function DeleteDialog({
	attribute,
	id,
	refetch,
	toggleForm,
	name,
}: {
	attribute: ISpecifications;
	id: string;
	refetch: () => void;
	toggleForm: (t: boolean) => void;
	name: string;
}) {
	const { mutateAsync: removeAttribute } = useRemoveProductAttributes(id);

	const handleDelete = async (attribute: ISpecifications) => {
		const payload = {
			attributeKey: name,
			id: attribute._id,
		};
		const response = await removeAttribute(payload);
		if (response.status === 'SUCCESS') {
			refetch();
			toggleForm(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className="flex w-full items-center gap-12 py-12" asChild>
				<Button size="icon" variant="ghost">
					<Trash2 className="!size-18 text-red-1" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="gap-24">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-24">Remove Attribute?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your account and
						remove your data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!pt-32">
					<AlertDialogCancel>
						<span className="text-14 font-normal">Cancel</span>
					</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDelete(attribute)}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
