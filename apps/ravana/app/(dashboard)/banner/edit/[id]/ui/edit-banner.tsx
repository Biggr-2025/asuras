/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-lines-per-function */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	Button,
	FloatingInput,
	FloatingTextArea,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Switch,
} from '@asuras/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { useGetBannerById } from '../api/get-banner-by-id';
import useUpdateBanner from '../api/update-banner';

const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	active: z.boolean(),
	bgColorCode: z.string().min(1, { message: 'Type is required' }),
	isImage: z.boolean(),
});

type IFormData = z.infer<typeof schema>;

export function AddEditBanner({ type }: { type: 'ADD' | 'EDIT' }) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			active: false,
			bgColorCode: '',
			isImage: false,
		},
	});
	const params = useParams();
	const { mutateAsync: updateBanner, isPending } = useUpdateBanner(params?.id as string);
	const { data, refetch } = useGetBannerById(params?.id as string);

	useEffect(() => {
		if (params?.id) {
			form.reset({
				title: data?.data?.banner?.title || '',
				description: data?.data?.banner?.description || '',
				active: data?.data?.banner?.active || false,
				bgColorCode: data?.data?.banner?.bgColorCode || '',
				isImage: data?.data?.banner?.isImage || false,
			});
		}
	}, [
		data?.data?.banner?.active,
		data?.data?.banner?.bgColorCode,
		data?.data?.banner?.description,
		data?.data?.banner?.isImage,
		data?.data?.banner?.title,
		form,
		params?.id,
	]);

	const onSubmit = async (values: IFormData) => {
		const response = await updateBanner(values);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	const fields: {
		name: keyof IFormData;
		label: string;
		type: 'text' | 'switch' | 'textarea';
		desc?: string;
	}[] = [
			{ name: 'title', label: 'Title', type: 'text' },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{ name: 'bgColorCode', label: 'Background Color Code', type: 'text' },
			{
				name: 'isImage',
				label: 'Is Banner Image',
				desc: 'Check it if the banner is image.',
				type: 'switch',
			},
			{
				name: 'active',
				label: 'Is Banner active',
				desc: 'Make it inactive if you dont need.',
				type: 'switch',
			},
		];

	const renderField = (field: (typeof fields)[number]) => {
		if (field.type === 'switch') {
			return (
				<FormField
					key={field.name}
					control={form.control}
					name={field.name}
					render={({ field: switchField }) => (
						<FormItem className="flex flex-row items-center gap-12">
							<div className="space-y-2">
								<FormLabel className="text-base">{field.label}</FormLabel>
								<FormDescription>{field.desc}</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={switchField.value as boolean}
									onCheckedChange={switchField.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
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
									{...(inputField as any)}
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
								{...(inputField as any)}
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
							loadingText={
								type === 'EDIT' ? 'Updating Banner...' : 'Creating Banner...'
							}
							type="submit"
							className="col-span-2 w-[240px]"
						>
							Update
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
