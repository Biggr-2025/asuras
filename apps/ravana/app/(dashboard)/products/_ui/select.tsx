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

export default function SelectInput({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="active"
			render={({ field: selectField, fieldState }) => {
				return (
					<FormItem>
						<FormLabel>Type</FormLabel>
						<Select
							onValueChange={selectField.onChange}
							defaultValue={selectField.value}
							value={selectField.value}
						>
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
								<SelectItem value="false">InActive</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
