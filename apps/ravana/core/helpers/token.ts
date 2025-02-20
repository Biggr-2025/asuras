'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { IAuthState } from '../../types';
import { AppConstansts, Routes } from '../primitives';

export const authToken = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(AppConstansts.AccessToken)?.value as string;
	return jwtDecode(accessToken) as IAuthState;
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(AppConstansts.AccessToken);
	cookieStore.delete(AppConstansts.RefreshToken);
	redirect(Routes.Login);
};
