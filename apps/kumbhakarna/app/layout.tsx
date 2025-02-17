import '../assets/css/global.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

const Providers = dynamic(() => import('../core/services/providers'));

export const metadata = {
	title: 'Biggr',
	description: 'Biggr',
	themeColor: '#ffffff',
	icons: {
		icon: [
			{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '96x96', url: '/favicon/favicon-96x96.png' },
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '192x192',
				url: '/favicon/android-icon-192x192.png',
			},
		],
		apple: [
			{ rel: 'apple-touch-icon', sizes: '152x152', url: '/favicon/apple-icon-152x152.png' },
			{ rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-icon-180x180.png' },
		],
		other: [
			{ rel: 'manifest', url: '/favicon/manifest.json' },
			{ rel: 'msapplication-TileImage', url: '/favicon/ms-icon-144x144.png' },
		],
		shortcut: '/favicon/favicon.ico',
	},
};

const sathoshi = localFont({
	src: [
		{
			path: '../assets/fonts/sathoshi/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sathoshi',
	display: 'swap',
	preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sathoshi.variable} font-sathoshi scroll-smooth`}>
			<body>
				<Providers>{children}</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
