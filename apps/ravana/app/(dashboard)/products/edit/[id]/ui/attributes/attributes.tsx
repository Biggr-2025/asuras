import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
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
import { Edit, PlusIcon, Trash2 } from 'lucide-react';

import { useRemoveProductAttributes } from '../../api/remove-product-attributes';
import { useEditProduct } from '../../context/edit-product';

export default function Attributes({
	id,
	name,
	title,
	data,
	refetch,
}: {
	id: string;
	name: string;
	title: string;
	data: ICatalougeTypes.ISpecifications[];
	refetch: () => void;
}) {
	const { setAttributeKey, setAttributeName, toggleForm, setType, setAttribute } =
		useEditProduct();
	const { mutateAsync: removeAttribute } = useRemoveProductAttributes(id);

	const handleAccordian = () => {
		setAttributeKey(name);
		setAttributeName(title);
		toggleForm(false);
		setAttribute(null);
		setType(null);
	};

	const handleEdit = (attribute: ICatalougeTypes.ISpecifications) => {
		toggleForm(true);
		setType('EDIT');
		setAttribute(attribute);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleAddAttribute = () => {
		toggleForm(true);
		setType('ADD');
	};

	const handleDelete = async (attribute: ICatalougeTypes.ISpecifications) => {
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
		<AccordionItem value={name}>
			<AccordionTrigger onClick={handleAccordian} className="text-muted-foreground">
				{title}
			</AccordionTrigger>
			<AccordionContent>
				{data?.map((attribute) => {
					return (
						<div
							className="border-grey-divider rounded-8 mb-16 flex justify-between border px-12 py-8"
							key={attribute._id}
						>
							<div className="flex flex-col gap-12">
								<div className="font-medium">{attribute.key}</div>
								<div className="text-14">{attribute.value}</div>
							</div>
							<div className="flex gap-16">
								<Button
									onClick={() => handleEdit(attribute)}
									size="icon"
									variant="ghost"
								>
									<Edit className="!size-18" />
								</Button>
								<AlertDialog>
									<AlertDialogTrigger
										className="flex w-full items-center gap-12 py-12"
										asChild
									>
										<Button size="icon" variant="ghost">
											<Trash2 className="!size-18 text-red-1" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent className="gap-24">
										<AlertDialogHeader>
											<AlertDialogTitle className="text-24">
												Remove Attribute?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete your account and remove your data.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter className="!pt-32">
											<AlertDialogCancel>
												<span className="text-14 font-normal">Cancel</span>
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDelete(attribute)}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					);
				})}
				<Button onClick={handleAddAttribute} className="my-16">
					<PlusIcon />
					<span>Add Attributes</span>
				</Button>
			</AccordionContent>
		</AccordionItem>
	);
}
