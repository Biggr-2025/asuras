'use client';

import { useEffect, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@asuras/ui';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { Routes } from '../../../../core/primitives/routes';
import { useAppDispatch } from '../../../../core/store';
import { authenticateUser } from '../../../../core/store/auth';
import { closeModal, openModal } from '../../../../core/store/layout-reducer';
import { signinAction } from './signin-action';

export default function Page() {
	const params = useParams();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { execute, result, isExecuting } = useAction(signinAction);
	const [otp, setOtp] = useState('');

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

	const handleBack = () => {
		router.back();
	};

	const handleComplete = () => {
		execute({
			mobileNumber: params?.mobileNumber as string,
			otp,
		});
	};

	return (
		<div>
			<div onClick={handleBack} className="flex items-center gap-12">
				<div className="flex size-32 cursor-pointer items-center justify-center">
					<ArrowLeft width={24} height={24} />
				</div>
				<span className="text-32 text-left font-semibold leading-[42px]">
					Enter 6 digit OTP code
				</span>
			</div>
			<div className="text-14 text-grey-text3 my-12">
				OTP sent to{' '}
				<span className="text-black-1 font-medium">+91-{params?.mobileNumber}</span>
			</div>
			<div className="mt-24 flex gap-12">
				<InputOTP
					value={otp}
					onChange={(value) => setOtp(value)}
					maxLength={6}
					pattern={REGEXP_ONLY_DIGITS}
					onComplete={handleComplete}
				>
					<InputOTPGroup>
						{Array.from({ length: 6 }, (_, index) => {
							return <InputOTPSlot key={index} index={index} />;
						})}
					</InputOTPGroup>
				</InputOTP>
			</div>
		</div>
	);
}
