import { useState } from 'react';
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

export function FormSelect({ name, label, form, paramKey }: FormSelectProps) {
	const [value, setValue] = useState('');
	//TODO: how to pass by department and categpory
	const { data } = useGetProductUtilsList({
		apiKey: 'productUtil/list',
		type: paramKey,
		searchTerm: value,
		active: 0,
		page: 0,
		limit: 30,
		count: 1,
	});

	return (
		<FormField
			control={form.control}
			name={name}
			key={name}
			render={({ field }) => (
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
										!field.value && 'text-muted-foreground'
									)}
								>
									<span className="text-14 font-normal">
										{field.value ? field.value : 'Select an Option'}
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
										{data &&
											data?.data?.list?.map((option) => (
												<CommandItem
													value={option.name}
													key={option.name}
													onSelect={() => {
														form.setValue(name, option.name);
													}}
												>
													{option.name}
													<Check
														className={cn(
															'ml-auto',
															option.name === field.value
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
			)}
		/>
	);
}
