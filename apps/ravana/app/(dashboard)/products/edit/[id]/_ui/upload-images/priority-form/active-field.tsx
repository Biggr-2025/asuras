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

export default function ActiveField({ control }: { control: Control<IFormData> }) {
	return (
		<FormField
			control={control}
			name="active"
			render={({ field: selectField, fieldState }) => (
				<FormItem className="col-span-1">
					<FormLabel>Active</FormLabel>
					<Select onValueChange={selectField.onChange} value={selectField.value}>
						<FormControl>
							<SelectTrigger isError={!!fieldState.error} className="!mt-6 bg-white">
								<SelectValue placeholder="Select Status" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value="true">Active</SelectItem>
							<SelectItem value="false">Inactive</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
