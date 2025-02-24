import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { logout } from '../helpers';
import { store } from '../store';
import { ResetTokenAndReattemptRequest } from './reattempt-token';

// Interface for the error response data
interface AxiosErrorResponseData {
	status: string;
	msg: string;
	statusCode: number;
}

// Custom Axios error interface
interface CustomAxiosError extends AxiosError {
	response?: AxiosResponse<AxiosErrorResponseData>;
}

// Create an instance of axios
export const HttpService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
});

HttpService.interceptors.request.use(
	async (config) => {
		try {
			const state = store.getState() as any;
			if (state?.auth?.loggedIn && state?.auth?.accessToken) {
				config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
			}
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

HttpService.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: CustomAxiosError) => {
		let errorMessage = 'An unexpected error occurred.';

		if (error.response) {
			const { statusCode, msg } = error.response.data;

			if (statusCode === 401 && msg === 'jwt expired') {
				return ResetTokenAndReattemptRequest(error.response);
			}

			if (msg === 'Inactive user!') {
				logout();
			}

			const errorMessages: Record<number, string> = {
				400: msg || 'Bad request. Please check your input.',
				401: 'Unauthorized. Please log in again.',
				403: 'Forbidden. You do not have permission to access this resource.',
				404: 'Resource not found. Please check the endpoint.',
				500: 'Internal server error. Please try again later.',
			};

			errorMessage = errorMessages[statusCode] || msg || errorMessage;
		} else if (error.request) {
			errorMessage = 'Network error. Please check your internet connection.';
		} else {
			errorMessage = 'An error occurred. Please try again.';
		}
		toast.error(errorMessage);
		return Promise.reject(error);
	}
);
