import { Control } from 'react-hook-form';
import {
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

import { IFormData } from './validations';

export default function PriorityField({ control }: { control: Control<IFormData> }) {
	return (
		<FormField
			control={control}
			name="priority"
			render={({ field: selectField, fieldState }) => (
				<FormItem className="col-span-1">
					<FormLabel>Priority</FormLabel>
					<Select onValueChange={selectField.onChange} value={selectField.value}>
						<FormControl>
							<SelectTrigger isError={!!fieldState.error} className="!mt-6 bg-white">
								<SelectValue placeholder="Select Priority" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{Array.from({ length: 50 }, (_, index) => (
								<SelectItem value={`${index + 1}`} key={index}>
									{index + 1}
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
