import { useForm } from 'react-hook-form';
import {
	Button,
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
import { z } from 'zod';

import { useUpdateImageAttributes } from '../../api/update-image-attributes';

type IFormData = {
	priority: string;
	active: string;
};

const schema = z.object({
	priority: z.string().min(1, { message: 'Priority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});

export default function PriorityUpdateForm({
	image,
	id,
	refetch,
}: {
	image: ICatalougeTypes.IProductImage;
	id: string;
	refetch: () => void;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			priority: image?.priority?.toString() || '',
			active: image?.active?.toString() || 'true',
		},
	});
	const { mutateAsync: updateImageAttributes, isPending } = useUpdateImageAttributes(id);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			productImageId: image._id,
			active: values.active === 'true',
			priority: Number(values.priority),
		};
		const response = await updateImageAttributes(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className="border-grey-light rounded-12 mt-24 flex max-w-[720px] flex-col gap-12 border p-16">
			<h2>Update Priority</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 justify-between gap-24"
				>
					<FormField
						control={form.control}
						name="priority"
						render={({ field: selectField, fieldState }) => (
							<FormItem className="col-span-1">
								<FormLabel>Priority</FormLabel>
								<Select
									onValueChange={selectField.onChange}
									value={selectField.value}
								>
									<FormControl>
										<SelectTrigger
											isError={!!fieldState.error}
											className="!mt-6 bg-white"
										>
											<SelectValue placeholder="Select Priority" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Array.from({ length: 50 }, (_, index) => {
											return (
												<SelectItem value={`${index + 1}`} key={index}>
													{index + 1}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="active"
						render={({ field: selectField, fieldState }) => (
							<FormItem className="col-span-1">
								<FormLabel>Active</FormLabel>
								<Select
									onValueChange={selectField.onChange}
									value={selectField.value}
								>
									<FormControl>
										<SelectTrigger
											isError={!!fieldState.error}
											className="!mt-6 bg-white"
										>
											<SelectValue placeholder="Select Status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="true">Active</SelectItem>
										<SelectItem value="false">InActive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="max-w-[240px]"
						loading={isPending}
						loadingText="Updating..."
						disabled={isPending}
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
