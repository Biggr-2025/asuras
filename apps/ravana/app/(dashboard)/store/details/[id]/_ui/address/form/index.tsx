import React from 'react';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@asuras/ui';

import { IFormData } from './schema';
import { useAddressForm } from './use-form';

export default function Index() {
	const { form, onSubmit, isPending, isLoading } = useAddressForm();

	return (
		<div className="rounded-8 shadow-card1 col-span-3 bg-white p-12">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-24">
					{[
						['line1', 'Line1', true],
						['line2', 'Line2', true],
						['pincode', 'Pincode', true],
						['state', 'State', false],
						['district', 'District', false],
					].map(([formKey, label, editable = true]) => (
						<FormField<IFormData>
							key={formKey as string}
							control={form.control}
							name={formKey as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem>
									<FormControl>
										<FloatingInput
											id={formKey as string}
											label={label as string}
											type="text"
											isError={!!fieldState.error}
											disabled={!editable}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button disabled={isLoading || isPending} type="submit" className="col-span-2">
						Update
					</Button>
				</form>
			</Form>
		</div>
	);
}
