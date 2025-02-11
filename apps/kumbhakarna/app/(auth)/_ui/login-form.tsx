'use client';

import { useForm } from 'react-hook-form';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@asuras/ui';
import { phoneValidator } from '@asuras/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { Routes } from '../../../core/primitives';
import { useGetOtp } from '../_api/get-otp';
import { useGetIsUserRegistered } from '../_api/is-user-registered';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export default function LoginForm({
	open,
	onChange,
}: {
	open: boolean;
	onChange: (o: boolean) => void;
}) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	const router = useRouter();
	const { mutateAsync: getOtp, isPending } = useGetOtp();
	const { mutateAsync: isUserRegistered, isPending: isLoading } = useGetIsUserRegistered();

	const onSubmit = async (values: { mobileNumber: string }) => {
		const payload = {
			mobile: values.mobileNumber,
		};
		const response = await isUserRegistered(payload);
		if (response.status === 'SUCCESS') {
			if (!response.data.isUser) {
				toast.error('Only registered users can log in.');
			} else if (response.data.isUser && response.data.role === 'ADMIN') {
				toast.error('Only stores can login in. Admins have a different Portal.');
			} else {
				const otpPayload = {
					mobile: Number(values.mobileNumber),
				};
				const optResponse = await getOtp(otpPayload);
				if (optResponse.status === 'SUCCESS') {
					onChange(false);
					router.push(`${Routes.Otp}/${values.mobileNumber}`);
				}
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onChange}>
			<DialogContent className="overflow-y-auto">
				<DialogTitle className="pt-32">
					<span className="text-24 text-left font-medium">
						Get started with your 10 digit mobile number
					</span>
				</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24">
						<FormField
							control={form.control}
							name="mobileNumber"
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label="Enter your Mobile Number"
											type="numeric"
											id="mobileNumber"
											maxLength={10}
											isError={!!fieldState.error}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							loading={isPending || isLoading}
							disabled={isPending || isLoading}
							loadingText="Sending Otp"
							type="submit"
							className="mt-24 w-full"
						>
							Get OTP
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
