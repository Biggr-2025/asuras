import { ReactNode } from 'react';
import { cn } from '@asuras/utils';

interface IStoreProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const StoreProductsListingContent = ({
	children,
	className,
	...props
}: IStoreProductListingContentProps) => {
	return (
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
