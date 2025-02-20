import { AccordionContent, AccordionItem, AccordionTrigger, Button } from '@asuras/ui';
import { Edit, PlusIcon } from 'lucide-react';

import { useEditProduct } from '../../_context/edit-product';
import DeleteDialog from './delete-dialog';

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

	return (
		<AccordionItem value={name}>
			<AccordionTrigger onClick={handleAccordian} className="text-muted-foreground">
				{title}
			</AccordionTrigger>
			<AccordionContent>
				{data?.map((attribute) => {
					return (
						<div
							className="rounded-8 border-grey-divider mb-16 flex justify-between border px-12 py-8"
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
								<DeleteDialog
									attribute={attribute}
									id={id}
									refetch={refetch}
									toggleForm={toggleForm}
									name={name}
								/>
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
