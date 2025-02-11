/* eslint-disable max-lines-per-function */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@asuras/ui';
import { gstValidator, phoneValidator } from '@asuras/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { z } from 'zod';

import { signUpAction } from '../_api/signup-action';

const schema = z.object({
	storeName: z.string().min(3, { message: 'Store Name must have at least 3 characters' }),
	storeLocation: z.string().min(1, { message: 'Store Location is required' }),
	companyName: z.string().min(3, { message: 'Company Name must have at least 3 characters' }),
	ownerName: z.string().min(3, { message: 'Owner/Manager Name must have at least 3 characters' }),
	gstNo: z.string().regex(gstValidator, { message: 'GST is not valid' }),
	ownerContact: z.string().regex(phoneValidator, { message: 'Phone number is not valid' }),
});

type IFormData = z.infer<typeof schema>;

export default function RegisterForm({
	open,
	onChange,
}: {
	open: boolean;
	onChange: (o: boolean) => void;
}) {
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
		if (!result || Object.keys(result).length <= 0) return;

		if (result?.data?.status === 200) {
			toast.success(result?.data?.msg);
			form?.reset();
			onChange(false);
		} else {
			toast.error(result?.data?.msg);
		}
	}, [form, onChange, result, result?.data]);

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
		<Dialog open={open} onOpenChange={onChange}>
			<DialogContent className="overflow-y-auto">
				<div className="flex h-full flex-col items-center justify-center py-24">
					<DialogTitle className="text-32 mb-12 text-left font-semibold leading-[42px]">
						Register your Business
					</DialogTitle>
					<DialogDescription className="text-12 leading-12 text-grey-text2 text-center">
						Please provide all the required details to register your business with us
					</DialogDescription>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="mt-24 grid w-full gap-16 lg:grid-cols-2"
						>
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
				</div>
			</DialogContent>
		</Dialog>
	);
}
