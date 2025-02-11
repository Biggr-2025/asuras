'use client';

import { ReactNode, useEffect } from 'react';
import { useResize } from '@asuras/hooks';
import { SidebarInset, SidebarProvider } from '@asuras/ui';
import { useRouter } from 'next/navigation';

import { Routes } from '../../core/primitives';
import { useAppSelector } from '../../core/store';
import { AppMobile, AppSidebar, Header } from '../../core/ui';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAppSelector((state) => state.auth);
	const router = useRouter();
	const { isDesktop } = useResize();

	// const pathname = usePathname();
	// const { trackEvent } = useAnalytics();

	useEffect(() => {
		if (!loggedIn || !isDesktop) {
			router.push(Routes.Login);
		}
	}, [isDesktop, loggedIn, router]);

	// useEffect(() => {
	// 	trackEvent('PAGE_VIEW', { page: pathname });
	// }, [pathname]);

	if (!isDesktop) {
		return <AppMobile />;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className="bg-greyBg min-h-[calc(100vh-72px)]">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
