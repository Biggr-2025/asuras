import { HTMLAttributes } from 'react';

import { cn } from '../../utils';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('bg-grey-text3 animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
