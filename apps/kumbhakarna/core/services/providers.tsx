'use client';

import { Provider } from 'react-redux';
import { Toaster, TooltipProvider } from '@asuras/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../../core/store';
import { LoadingModal } from '../ui';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					{/* <AnalyticsProvider value={analytics}> */}
					<TooltipProvider>{children}</TooltipProvider>
					<Toaster closeButton richColors position="bottom-left" />
					<LoadingModal />
					{/* </AnalyticsProvider> */}
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default Providers;
