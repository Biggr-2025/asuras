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
import { gstValidator, panValidator, phoneValidator } from '@asuras/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { IStoreDetails } from '../../../../../../types';
import { useGetStoreDetails } from '../_api/get-store-details';
import { useUpdateBusinessDetails } from '../_api/update-business-details';

const schema = z.object({
	businessContact: z
		.string()
		.min(10, { message: 'Mobile number must be at least 10 digits' })
		.max(15, { message: 'Mobile number cannot exceed 15 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' })
		.optional(),
	ownerName: z
		.string()
		.min(3, { message: 'Owner Name must have at least 3 characters' })
		.optional(),
	entityName: z
		.string()
		.min(3, { message: 'Entity Name must have at least 3 characters' })
		.optional(),
	gstNo: z.string().regex(gstValidator, { message: 'GST is not valid' }).optional(),
	panNo: z.string().regex(panValidator, { message: 'PAN is not valid' }).optional(),
});

type IFormData = z.infer<typeof schema>;

export default function BusinessDetails({ id }: { id: string }) {
	const { data, refetch, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreDetails);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			businessContact: details.businessContact?.toString() ?? '',
			ownerName: details.ownerName ?? '',
			entityName: details.entityName ?? '',
			panNo: details.panNo ?? '',
			gstNo: details.gstNo ?? '',
		},
	});

	const { mutateAsync: updateBusinessDetails } = useUpdateBusinessDetails(id);

	useEffect(() => {
		if (data?.data?.store) {
			form.reset({
				ownerName: details.ownerName,
				businessContact: details.businessContact?.toString() ?? '',
				entityName: details.entityName,
				panNo: details.panNo,
				gstNo: details.gstNo,
			});
		}
	}, [data?.data?.store, form]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			...values,
			businessContact: values.businessContact ? Number(values.businessContact) : undefined,
		};
		const response = await updateBusinessDetails(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	const formFields: { name: keyof IFormData; label: string; type?: string }[] = [
		{ name: 'ownerName', label: 'Owner Name' },
		{ name: 'businessContact', label: 'Business Contact', type: 'tel' },
		{ name: 'entityName', label: 'Entity Name' },
		{ name: 'gstNo', label: 'GST Number' },
		{ name: 'panNo', label: 'PAN Number' },
	];

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 shadow-card1 grid max-w-[720px] grid-cols-2 gap-24 bg-white px-12 py-24"
			>
				{formFields.map(({ name, label, type }) => (
					<FormField
						key={name}
						control={form.control}
						name={name}
						render={({ field, fieldState }) => (
							<FormItem className="col-span-1">
								<FormControl>
									<FloatingInput
										label={label}
										id={name}
										type={type ?? 'text'}
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
