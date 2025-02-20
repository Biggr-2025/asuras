export interface IsUserRegisteredInterface {
	isUser: boolean;
	role: string;
}
export interface ILoginOtpApiResponse {
	type: string;
}
export interface ILoginInterface {
	accessToken: string;
	refreshToken: string;
}
export interface ISignupFormData {
	mobile: number;
	otp: number;
	name: string;
	role: string;
}
export interface ISigninFormData {
	mobile: number;
	otp: number;
}
export type ISubscription = 'BASIC' | 'ADVANCE' | 'PREMIUM';
export type IAuthState = {
	loading: boolean;
	loggedIn: boolean;
	token: null | string;
	refreshToken: null | string;
	userId?: null | string;
	mobile?: null | string;
	name?: string;
	active?: boolean;
	gender?: string;
	role?: null | string;
	clinicIds?: string[];
	createdAt?: string;
	updatedAt?: string;
	iat?: number;
	exp?: number;
	subscription?: null | ISubscription;
};
