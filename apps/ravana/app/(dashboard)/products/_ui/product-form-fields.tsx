import { UseFormReturn } from 'react-hook-form';

import { FormInput } from './input';
import { IFormData } from './schema';
import SelectInput from './select';
import { FormSelectDropdown } from './select-dropdown';

export function ProductFormFields({
	form,
	type,
}: {
	form: UseFormReturn<IFormData>;
	type: 'ADD' | 'EDIT';
}) {
	return (
		<>
			<FormInput name="title" label="Title" form={form} />
			<FormInput name="description" label="Description" form={form} isTextArea />
			<FormInput name="quantity" label="Quantity" form={form} type="number" />
			<FormInput name="packQuantity" label="Pack Quantity" form={form} type="number" />
			<FormInput name="mrp" label="MRP" form={form} type="number" />
			<FormInput name="price" label="Price" form={form} type="number" />
			<FormInput name="gstInPercent" label="GST in %" form={form} type="number" />
			<FormInput name="hsn" label="HSN" form={form} />
			<FormInput name="colour" label="Colour" form={form} />
			<FormInput name="size" label="Size" form={form} />
			<FormSelectDropdown
				name="department"
				label="Department"
				paramKey="DEPARTMENT"
				form={form}
			/>
			<FormSelectDropdown name="category" label="Category" form={form} paramKey="CATEGORY" />
			<FormSelectDropdown
				name="subcategory"
				label="Sub Category"
				form={form}
				paramKey="SUBCATEGORY"
			/>
			<FormSelectDropdown name="brand" label="Brand" form={form} paramKey="BRAND" />
			{type === 'EDIT' && <SelectInput form={form} />}
		</>
	);
}
