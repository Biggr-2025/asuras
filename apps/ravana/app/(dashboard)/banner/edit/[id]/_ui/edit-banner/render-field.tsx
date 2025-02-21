import { UseFormReturn } from 'react-hook-form';
import {
	FloatingInput,
	FloatingTextArea,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
} from '@asuras/ui';

import { IFormData } from './schema';

export const renderField = (form: UseFormReturn<IFormData>, field: any) => {
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
	}
	if (field.type === 'textarea') {
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
	if (field.type === 'select') {
		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name}
				render={({ field: selectField, fieldState }) => (
					<FormItem className="relative">
						<FormLabel>{field.label}</FormLabel>
						<Select onValueChange={selectField.onChange} value={`${selectField.value}`}>
							<FormControl>
								<SelectTrigger
									isError={!!fieldState.error}
									className="!mt-6 bg-white"
								>
									<SelectValue placeholder="Select a type" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{field.options?.map((option: number) => (
									<SelectItem key={`${option}`} value={`${option}`}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
			name={field.name}
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
