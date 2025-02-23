import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@asuras/ui';
import { FloatingInput, FloatingTextArea } from '@asuras/ui';

interface FormInputProps {
	name: string;
	label: string;
	type?: string;
	isTextArea?: boolean;
	form: any;
}

export function FormInput({
	name,
	label,
	type = 'text',
	isTextArea = false,
	form,
}: FormInputProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormControl>
						{isTextArea ? (
							<FloatingTextArea
								id={name}
								label={label}
								isError={!!fieldState.error}
								{...field}
							/>
						) : (
							<FloatingInput
								id={name}
								label={label}
								type={type}
								isError={!!fieldState.error}
								{...field}
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
