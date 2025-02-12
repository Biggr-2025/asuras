import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const capitalize = (value: string) => {
	return value
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const slideDown = {
	initial: { y: -50, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -50, opacity: 0 },
	transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
};

export const rupee = '\u20B9';

export const getCustomError = (response: any) => {
	const statusCode = response?.status || 500;
	const defaultMessage = 'An unexpected error occurred.';

	type StatusCode = 400 | 401 | 403 | 404 | 500;

	const messages: Record<StatusCode, string> = {
		400: response?.data?.error || 'Bad Request. Please check the input.',
		401: 'Unauthorized. Please log in again.',
		403: 'Forbidden. You do not have access to this resource.',
		404: 'Resource not found. Please check the endpoint.',
		500: 'Internal Server Error. Please try again later.',
	};

	const customMessage =
		messages[statusCode as StatusCode] || response?.data?.message || defaultMessage;

	return {
		statusCode,
		customMessage,
	};
};
