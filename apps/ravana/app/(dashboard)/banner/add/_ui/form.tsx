/* eslint-disable prettier/prettier */
/* eslint-disable indent */
'use client';

import { useForm } from 'react-hook-form';
import {
	Button,
	FloatingInput,
	FloatingTextArea,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Routes } from '../../../../../core/primitives';
import { BannerTypes } from '../../../../../core/primitives/constants';
import useCreateBanner from '../api/create-banner';

const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	type: z.string().min(1, { message: 'Type is required' }),
});

type IFormData = z.infer<typeof schema>;

// eslint-disable-next-line max-lines-per-function
export function AddEditBanner({ type }: { type: 'ADD' | 'EDIT' }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			type: '',
		},
	});
	const router = useRouter();
	const { mutateAsync: createBanner, isPending } = useCreateBanner();

	const onSubmit = async (values: IFormData) => {
		const response = await createBanner(values);
		if (response.status === 'SUCCESS') {
			form.reset();
			router.push(`${Routes.EditBanner}/${response.data.banner._id}?type=details`);
		}
	};

	const fields: {
		name: keyof IFormData;
		label: string;
		type: 'text' | 'select' | 'textarea';
		options?: { value: string; label: string }[];
	}[] = [
			{ name: 'title', label: 'Title', type: 'text' },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{
				name: 'type',
				label: 'Banner Type',
				type: 'select',
				options: BannerTypes,
			},
		];

	const renderField = (field: (typeof fields)[number]) => {
		if (field.type === 'select') {
			return (
				<FormField
					key={field.name}
					control={form.control}
					name={field.name}
					render={({ field: selectField, fieldState }) => {
						return (
							<FormItem>
								<FormLabel>{field.label}</FormLabel>
								<Select
									onValueChange={selectField.onChange}
									defaultValue={selectField.value}
									value={selectField.value}
								>
									<FormControl>
										<SelectTrigger
											isError={!!fieldState.error}
											className="!mt-6 bg-white"
										>
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{field.options?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			);
		} else if (field.type === 'textarea') {
			return (
				<FormField
					key={field.name}
					control={form.control}
					name={field.name}
					render={({ field: inputField, fieldState }) => (
						<FormItem className="relative col-span-1">
							<FormControl>
								<FloatingTextArea
									label={field.label}
									id={field.name}
									isError={!!fieldState.error}
									{...inputField}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			);
		}
		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name as keyof IFormData}
				render={({ field: inputField, fieldState }) => (
					<FormItem className="relative">
						<FormControl>
							<FloatingInput
								label={field.label}
								id={field.name}
								isError={!!fieldState.error}
								{...inputField}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	};

	return (
		<div className="rounded-8 shadow-card1 col-span-2 bg-white p-16">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-24"
				>
					{fields.map(renderField)}
					<div className="col-span-2">
						<Button
							disabled={isPending}
							loading={isPending}
							loadingText="Creating Banner..."
							type="submit"
							className="col-span-2 w-[240px]"
						>
							Add
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
