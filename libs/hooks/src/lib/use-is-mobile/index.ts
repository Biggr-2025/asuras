import { useMemo } from 'react';

export const useIsMobile = () => {
	return useMemo(() => {
		if (typeof navigator === 'undefined') return false;

		const userAgent = navigator.userAgent || navigator.vendor;
		return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);
	}, []);
};
