import { useEffect, useState } from 'react';
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@asuras/ui';
import { cn } from '@asuras/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

import { useGetProductUtilsList } from '../../../../core/api/app-utils/product-utils';

interface FormSelectProps {
	name: string;
	label: string;
	form: any;
	paramKey: string;
}

export function FormSelectDropdown({ name, label, form, paramKey }: FormSelectProps) {
	const [value, setValue] = useState('');
	const department = form.watch('departmentId');
	const category = form.watch('categoryId');
	const dependentField =
		paramKey === 'CATEGORY'
			? department?.name
			: paramKey === 'SUBCATEGORY'
				? category?.name
				: undefined;
	const { data, refetch } = useGetProductUtilsList({
		apiKey: 'productUtil/list',
		utilType: paramKey,
		searchTerm: value,
		active: 1,
		page: 0,
		limit: 30,
		count: 1,
		departmentId: paramKey === 'CATEGORY' ? department?._id : undefined,
		categoryId: paramKey === 'SUBCATEGORY' ? category?._id : undefined,
		enabled: paramKey === 'DEPARTMENT' || paramKey === 'BRAND' || !!dependentField,
	});

	useEffect(() => {
		if (dependentField) {
			refetch();
		}
	}, [dependentField, refetch]);

	return (
		<FormField
			control={form.control}
			name={name}
			key={name}
			render={({ field }) => {
				const selectedOption = typeof field.value === 'object' ? field.value : null;
				return (
					<FormItem className="flex flex-col">
						<FormLabel>{label}</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant="outline"
										role="combobox"
										className={cn(
											'border-grey-light h-48 justify-between',
											!selectedOption && 'text-muted-foreground'
										)}
									>
										<span className="text-14 font-normal">
											{selectedOption
												? selectedOption.name
												: 'Select an Option'}
										</span>
										<ChevronsUpDown className="!size-16 opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="w-[320px] p-0">
								<Command>
									<CommandInput
										value={value}
										onValueChange={setValue}
										placeholder="Search ..."
										className="h-42"
									/>
									<CommandList>
										<CommandEmpty>No options found.</CommandEmpty>
										<CommandGroup>
											{data?.data?.list?.map((option) => (
												<CommandItem
													key={option._id}
													value={option.name}
													onSelect={() => {
														form.setValue(name, option);
													}}
												>
													{option.name}
													<Check
														className={cn(
															'ml-auto',
															selectedOption &&
																selectedOption._id === option._id
																? 'opacity-100'
																: 'opacity-0'
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
