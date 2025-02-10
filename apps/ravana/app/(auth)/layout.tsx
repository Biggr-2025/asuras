'use client';

import { ReactNode, useEffect } from 'react';
import { ImagePlaceholder } from '@asuras/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Routes } from '../../core/primitives';
import { useAppSelector } from '../../core/store';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (loggedIn) {
			router.push(Routes.Home);
		}
	}, [loggedIn, router]);

	return (
		<section className="min-h-screen w-full overflow-hidden">
			<div className="grid min-h-screen grid-cols-3 overflow-hidden">
				<div className="bg-grey-4 col-span-2 flex items-center justify-center">
					<ImagePlaceholder
						src="/images/bg1.jpg"
						imageClasses="object-cover"
						containerClasses="w-full h-full"
					/>
				</div>
				<div className="col-span-1 flex flex-col bg-white">
					<div className="flex flex-1 flex-col  justify-center px-24">
						<div className="mb-24 flex items-center">
							<p className=" text-16 text-grey-text3">Welcome to</p>
							<ImagePlaceholder
								src="/images/logo.png"
								containerClasses="w-[120px] h-[42px]"
								imageClasses="object-cover"
							/>
						</div>
						{children}
					</div>
					<p className="text-12 px-16 py-24 text-center">
						By clicking you agree to our{' '}
						<Link href="/" className="text-primary-1 font-semibold" target="_blank">
							privacy policy
						</Link>{' '}
						and{' '}
						<Link href="/" className="text-primary-1 font-semibold" target="_blank">
							terms of use
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
