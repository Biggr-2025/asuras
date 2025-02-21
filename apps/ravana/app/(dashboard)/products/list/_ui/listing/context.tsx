import { ReactNode } from 'react';
import { cn } from '@asuras/utils';

interface IProductListingContentProps {
	children: ReactNode;
	className?: string;
}

export const ProductListingContent = ({
	children,
	className,
	...props
}: IProductListingContentProps) => {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	);
};
