'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Button, ImagePlaceholder, Spinner } from '@asuras/ui';
import { Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Routes } from '../../core/primitives';
import { useAppSelector } from '../../core/store';

const LoginForm = dynamic(() => import('./_ui/login-form'), {
	loading: () => <Spinner />,
});

const RegisterForm = dynamic(() => import('./_ui/register-form'), {
	loading: () => <Spinner />,
});

const details = [
	'Take your store brand online at a click',
	'Grow your business, Sell your products online',
	'Free and fast Onboarding with Zero fee',
];

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();
	const [showLogin, setLogin] = useState(false);
	const [showRegister, setRegister] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			router.push(Routes.Home);
		}
	}, [loggedIn, router]);

	return (
		<section className="flex h-screen w-full flex-col overflow-y-scroll bg-white pb-[80px] lg:overflow-hidden">
			<div className="flex h-[72px] items-center justify-between px-12 lg:px-24">
				<Link href={Routes.Login}>
					<ImagePlaceholder
						src="/images/logo.png"
						containerClasses="w-[120px] h-[42px] lg:w-[162px] lg:h-[64px]"
						imageClasses="object-contain"
					/>
				</Link>
				<div>
					<Button
						onClick={() => setLogin(true)}
						className="w-[120px] lg:w-[180px] lg:rounded-full"
					>
						<span className="text-14 lg:text-18">Login</span>
					</Button>
				</div>
			</div>
			<div className="rounded-16 bg-grey-cream mx-12 my-24 h-screen flex-1 grid-cols-1 p-12 lg:mx-24 lg:hidden lg:grid-cols-5 lg:overflow-hidden">
				<div className="flex h-full flex-col">
					<div>
						<h1 className="text-28 lg:text-42 text-center font-bold">
							Powering Retail Business
						</h1>
						<h1 className="text-28 lg:text-42 text-center font-bold">to go Digital</h1>
					</div>
					<div className="col-span-1 my-32 w-full lg:col-span-3">{children}</div>
					<div className="text-16">
						A consumer online platform designed to help retail stores sell online, with
						their brand name getting prominent Digital visibility.
					</div>
					<div className="gap-18 my-24 flex flex-col">
						{details.map((detail, i) => {
							return (
								<div className="flex gap-8" key={i}>
									<span className="bg-secondary flex size-24 items-center justify-center rounded-full">
										<Check className="size-18 text-secondary-foreground" />
									</span>
									<span className="text-16 flex-1 font-medium">{detail}</span>
								</div>
							);
						})}
					</div>
					<div>
						<h1 className="text-28 lg:text-42 text-center font-bold">Start Selling</h1>
						<h1 className="text-28 lg:text-42 text-center font-bold">With Biggr</h1>
					</div>
				</div>
			</div>
			<div className="rounded-16 bg-grey-cream mx-12 my-24 hidden flex-1 grid-cols-1 lg:mx-24 lg:grid lg:grid-cols-5">
				<div className="order-last col-span-1 flex items-center justify-center lg:order-first lg:col-span-2">
					<div className="flex h-full flex-col justify-evenly px-16 py-24 lg:px-24 lg:py-32">
						<div>
							<h1 className="text-28 lg:text-42 text-center font-bold">
								Powering Retail Business
							</h1>
							<h1 className="text-28 lg:text-42 text-center font-bold">
								to go Digital
							</h1>
						</div>
						<p className="gap-18 text-16 my-24 flex flex-col">
							A consumer online platform designed to help retail stores sell online,
							with their brand name getting prominent Digital visibility.
						</p>
						<div className="gap-18 mb-24 flex flex-col">
							{details.map((detail, i) => {
								return (
									<div className="flex gap-8" key={i}>
										<span className="bg-secondary flex size-24 items-center justify-center rounded-full">
											<Check className="size-18 text-secondary-foreground" />
										</span>
										<span className="text-16 flex-1 font-medium">{detail}</span>
									</div>
								);
							})}
						</div>
						<div className="mb-12 mt-24">
							<h1 className="text-28 lg:text-18 text-center font-bold">
								Start Selling With Biggr
							</h1>
						</div>
						<Button
							onClick={() => setRegister(true)}
							className="mx-auto hidden w-[240px] rounded-full lg:block"
						>
							<span className="text-18">Register for Free</span>
						</Button>
					</div>
				</div>
				<div className="col-span-1 flex items-center justify-center lg:col-span-3">
					{children}
				</div>
			</div>
			<LoginForm open={showLogin} onChange={setLogin} />
			<RegisterForm open={showRegister} onChange={setRegister} />
			<div className="shadow-card1 fixed bottom-0 w-full bg-white p-12 lg:hidden">
				<Button onClick={() => setRegister(true)} className="w-full">
					<span className="text-18">Register</span>
				</Button>
			</div>
		</section>
	);
}
