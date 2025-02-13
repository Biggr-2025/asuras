'use client';

import { Button, Form } from '@asuras/ui';

import { ProductFormFields } from './product-form-fields';
import { useProductForm } from './use-product-form';

export function ProductForm({ type }: { type: 'ADD' | 'EDIT' }) {
	const { form, onSubmit, isPending, isLoading } = useProductForm(type);

	return (
		<div className="rounded-8 py-18 shadow-card1 max-w-[720px] bg-white px-16">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-24">
					<ProductFormFields form={form} type={type} />
					<Button
						type="submit"
						disabled={isPending || isLoading}
						loading={isPending || isLoading}
						className="col-span-2"
					>
						{type === 'EDIT' ? 'Update' : 'Add'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
