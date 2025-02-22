import { UseFormReturn } from 'react-hook-form';

import { FormFieldRenderer } from './form-renderer';
import { IFormData } from './index';
import { ProductSelectFields } from './select-fields';

const fields = [
	{ name: 'price', label: 'Price', keyboardType: 'numeric', type: 'text' },
	{ name: 'quantity', label: 'Quantity', keyboardType: 'numeric', type: 'text' },
	{ name: 'discount', label: 'Discount', keyboardType: 'numeric', type: 'text' },
	{ name: 'comment', label: 'Comment', type: 'textfield', keyboardType: 'default' },
];

export default function ProductForm({ form }: { form: UseFormReturn<IFormData> }) {
	return (
		<>
			{fields.map((field) => (
				<FormFieldRenderer key={field.name} field={field} form={form} />
			))}
			<ProductSelectFields form={form} />
		</>
	);
}
