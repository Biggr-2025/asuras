import { UseFormReturn } from 'react-hook-form';
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

import { IFormData } from '.';

export function ProductSelectFields({ form }: { form: UseFormReturn<IFormData> }) {
	return (
		<>
			<FormField
				control={form.control}
				name="active"
				render={({ field: selectField, fieldState }) => (
					<FormItem>
						<FormLabel>Active</FormLabel>
						<Select onValueChange={selectField.onChange} value={selectField.value}>
							<FormControl>
								<SelectTrigger
									isError={!!fieldState.error}
									className="!mt-6 bg-white"
								>
									<SelectValue placeholder="Select a type" />
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
			<FormField
				control={form.control}
				name="status"
				render={({ field: selectField, fieldState }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<Select onValueChange={selectField.onChange} value={selectField.value}>
							<FormControl>
								<SelectTrigger
									isError={!!fieldState.error}
									className="!mt-6 bg-white"
								>
									<SelectValue placeholder="Select a Status" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="ADDED">Added</SelectItem>
								<SelectItem value="HOLD">Hold</SelectItem>
								<SelectItem value="APPROVED">Approved</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
