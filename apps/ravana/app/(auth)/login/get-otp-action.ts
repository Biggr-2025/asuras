'use server';

import { phoneValidator } from '@asuras/utils';
import { z } from 'zod';

import { ApiEndpoints } from '../../../core/primitives';
import { safeActionClient } from '../../../core/services';
import { IApiResponse, IsUserRegisteredInterface } from '../../../types';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

const getOtpAction = safeActionClient.schema(schema).action(async ({ parsedInput }) => {
	const { mobileNumber } = parsedInput;
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.IsUserRegistered}/${mobileNumber}`
		);

		if (!response.ok) {
			return {
				status: 'ERROR',
				msg: 'Failed to check user registration.',
				data: null,
				statusCode: response.status,
			} as IApiResponse<null>;
		}

		const data = (await response.json()) as IApiResponse<IsUserRegisteredInterface>;

		if (data?.status === 'SUCCESS' && data?.data?.isUser && data?.data?.role === 'ADMIN') {
			try {
				const otpResponse = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.Otp}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ mobile: mobileNumber }),
					}
				);
				if (!otpResponse.ok) {
					return {
						status: 'ERROR',
						msg: 'Failed to check user registration.',
						data: null,
						statusCode: response.status,
					} as IApiResponse<null>;
				}
				const otpData = (await otpResponse.json()) as IApiResponse<{
					type: 'success';
				}>;
				return otpData;
			} catch (err) {
				console.error(err);
				return {
					status: 'ERROR',
					msg: 'A network error occurred. Please check your connection and try again.',
					data: null,
					statusCode: 500,
				} as IApiResponse<null>;
			}
		} else {
			return {
				status: 'ERROR',
				msg: 'Only registered users can log in.',
				data: null,
				statusCode: 401,
			} as IApiResponse<null>;
		}
	} catch (err) {
		console.error(err);
		return {
			status: 'ERROR',
			msg: 'A network error occurred. Please check your connection and try again.',
			data: null,
			statusCode: 500,
		} as IApiResponse<null>;
	}
});

export { getOtpAction };
