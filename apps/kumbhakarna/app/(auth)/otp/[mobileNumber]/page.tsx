'use client';

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Routes } from '../../../../core/primitives/routes';
import { useAppDispatch } from '../../../../core/store';
import { authenticateUser } from '../../../../core/store/auth';
import { closeModal, openModal } from '../../../../core/store/layout-reducer';
import useOtpHook from './use-otp-hook';

export default function Page() {
	const params = useParams();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		otp,
		otpRefs,
		handleClick,
		handleKeyDown,
		handleOtpChange,
		handleBack,
		isExecuting,
		result,
	} = useOtpHook({
		mobile: params?.mobileNumber as string,
	});

	useEffect(() => {
		if (isExecuting) {
			dispatch(openModal({ view: 'LOADING', loadingText: 'Setting up user...' }));
		} else {
			dispatch(closeModal());
		}
	}, [dispatch, isExecuting]);

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === 'SUCCESS') {
			dispatch(
				authenticateUser({
					accessToken: result.data.data?.accessToken as string,
					refreshToken: result.data.data?.refreshToken as string,
				})
			);
			router.push(Routes.Home);
		} else {
			toast.error(result.data.msg);
		}
	}, [dispatch, result, result.data, router]);

	return (
		<div className="p-54 flex h-full flex-col items-start justify-center bg-white px-24">
			<div className="flex items-start">
				{/* <div className="w-32 h-32 flex justify-center items-center cursor-pointer">
					<ArrowLeft width={24} height={24} />
				</div> */}
				<span className="text-32 text-left font-semibold leading-[42px]">
					Enter 6 digit OTP code
				</span>
			</div>
			<div className="text-14 text-grey-text3 my-12">
				OTP sent to{' '}
				<span className="text-black-1 font-medium">+91-{params?.mobileNumber}</span>
			</div>
			<div className="mt-24 flex gap-12">
				{otp.map((_, i) => {
					return (
						<input
							key={i}
							ref={(input) => (otpRefs.current[i] = input) as any}
							className="rounded-8 border-grey-divider text-24 leading-16 focus:ring-brand size-[52px] border px-12 text-center  font-medium outline-none transition
   duration-300 ease-in-out focus:border-none focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-90"
							onChange={(e) => handleOtpChange(e, i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
							value={(otpRefs.current[i]?.value as string) || ''}
							onClick={(e) => handleClick(e, i)}
							maxLength={1}
						/>
					);
				})}
			</div>
		</div>
	);
}
