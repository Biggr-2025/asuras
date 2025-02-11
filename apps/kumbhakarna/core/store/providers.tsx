'use client';

import { Provider } from 'react-redux';
import { Toaster } from '@asuras/ui';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../store/index';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
				<Toaster closeButton richColors position="bottom-left" />
			</PersistGate>
		</Provider>
	);
};

export default Providers;
