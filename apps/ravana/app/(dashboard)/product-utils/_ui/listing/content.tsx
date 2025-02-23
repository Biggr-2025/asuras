import { ReactNode } from 'react';
import { cn } from '@asuras/utils';

interface IProductUtilListingContentProps {
	children: ReactNode;
	className?: string;
}

export const ProductUtilListingContent = ({
	children,
	className,
	...props
}: IProductUtilListingContentProps) => {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	);
};
