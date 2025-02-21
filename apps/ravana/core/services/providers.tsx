'use client';

import { Provider } from 'react-redux';
import { useResize } from '@asuras/hooks';
import { Toaster, TooltipProvider } from '@asuras/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../../core/store';
import { AppMobile, LoadingModal } from '../ui';

export const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const { isDesktop } = useResize();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>
						{isDesktop ? (
							<div key="desktop">{children}</div>
						) : (
							<AppMobile key="mobile" />
						)}
					</TooltipProvider>
					<Toaster closeButton richColors position="bottom-left" />
					<LoadingModal />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default Providers;
