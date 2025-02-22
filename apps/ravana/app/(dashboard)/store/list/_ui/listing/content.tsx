import { ReactNode } from 'react';
import { cn } from '@asuras/utils';

interface IStoreListingContentProps {
	children: ReactNode;
	className?: string;
}

export const StoreListingContent = ({
	children,
	className,
	...props
}: IStoreListingContentProps) => {
	return (
		<div className={cn('overflow-y-scroll', className)} {...props}>
			{children}
		</div>
	);
};
