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
	Spinner,
} from '@asuras/ui';
import { phoneValidator } from '@asuras/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { IStoreDetails } from '../../../../../../types';
import { useGetStoreDetails } from '../_api/get-store-details';
import { useUpdateBasicDetails } from '../_api/update-basic-detail';

const schema = z.object({
	mobile: z
		.string()
		.min(10, { message: 'Mobile number must be at least 10 digits' })
		.max(15, { message: 'Mobile number cannot exceed 15 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	name: z.string().min(3, { message: 'Name is required and must have at least 3 characters' }),
	email: z.string().email({ message: 'Invalid email address' }).optional(),
});

type IFormData = z.infer<typeof schema>;

export default function BasicDetails({ id }: { id: string }) {
	const { data, refetch, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreDetails);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			mobile: details.mobile || '',
			name: details.name || '',
			email: details.email ?? undefined,
		},
	});

	const { mutateAsync: updateBasicDetails } = useUpdateBasicDetails(id);

	useEffect(() => {
		if (data?.data?.store) {
			form.reset({
				name: details.name,
				mobile: details.mobile,
				email: details.email,
			});
		}
	}, [data?.data?.store, details.email, details.mobile, details.name, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			mobile: Number(values.mobile),
		};
		const response = await updateBasicDetails(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 shadow-card1 grid max-w-[720px] grid-cols-2 gap-24 bg-white px-12 py-24"
			>
				{(
					[
						['name', 'Name', 'text'],
						['mobile', 'Mobile Number', 'tel'],
						['email', 'Email', 'email'],
					] as const
				).map(([fieldName, label, type]) => (
					<FormField
						key={fieldName}
						control={form.control}
						name={fieldName as keyof IFormData}
						render={({ field, fieldState }) => (
							<FormItem className="col-span-1">
								<FormControl>
									<FloatingInput
										label={label}
										id={fieldName}
										type={type}
										value={field.value}
										onChange={field.onChange}
										isError={!!fieldState.error}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button className="col-span-2 max-w-[180px]">Submit</Button>
			</form>
		</Form>
	);
}
