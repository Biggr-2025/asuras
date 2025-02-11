/* eslint-disable max-lines-per-function */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@asuras/ui';
import { gstValidator, phoneValidator } from '@asuras/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { z } from 'zod';

import { Routes } from '../../../core/primitives';
import { signUpAction } from './api/signup-action';

const schema = z.object({
	storeName: z.string().min(3, { message: 'Store Name must have at least 3 characters' }),
	storeLocation: z.string().min(1, { message: 'Store Location is required' }),
	companyName: z.string().min(3, { message: 'Company Name must have at least 3 characters' }),
	ownerName: z.string().min(3, { message: 'Owner/Manager Name must have at least 3 characters' }),
	gstNo: z.string().regex(gstValidator, { message: 'GST is not valid' }),
	ownerContact: z.string().regex(phoneValidator, { message: 'Phone number is not valid' }),
});

type IFormData = z.infer<typeof schema>;

export default function Page() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			storeName: '',
			storeLocation: '',
			companyName: '',
			ownerName: '',
			gstNo: '',
			ownerContact: '',
		},
	});
	const { execute, result, isExecuting } = useAction(signUpAction);

	useEffect(() => {
		if (!result) return;

		if (result?.data?.status === 200) {
			toast.success(result?.data?.msg);
			form?.reset();
		}

		if (result.serverError) {
			toast.error(result.serverError);
		}
	}, [form, result, result.data]);

	useEffect(() => {
		if (!result.serverError) return;
		if (result.serverError) {
			toast.error(result.serverError);
		}
	}, [result.serverError]);

	const onSubmit = async (values: IFormData) => {
		execute(values);
	};

	return (
		<div className="flex h-full flex-col items-center justify-center py-24">
			<h1 className="text-32 mb-12 text-left font-semibold leading-[42px]">
				Register your Business
			</h1>
			<p className="text-12 leading-12 text-grey-text2">
				Please provide all the required details to register your business with us
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24 grid w-full gap-16">
					<FormField
						control={form.control}
						name="storeName"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Store Name"
										id="storeName"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="storeLocation"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Store Location"
										id="storeLocation"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="companyName"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Company Name"
										id="companyName"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gstNo"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="GST No."
										id="gstNo"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ownerName"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Owner/Manager Name"
										id="ownerName"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ownerContact"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Owner/Manager Contact No."
										id="ownerContact"
										isError={!!fieldState.error}
										type="numeric"
										maxLength={10}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						loading={isExecuting}
						disabled={isExecuting}
						loadingText="Submitting..."
						type="submit"
						className="w-full"
					>
						Submit
					</Button>
				</form>
			</Form>
			<div className="mt-24 text-center">
				{`Already you have an account?`}{' '}
				<Link href={Routes.Login}>
					<Button variant="ghost" size="sm">
						<span className="text-secondary font-bold">Login</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
