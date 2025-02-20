'use client';

import * as React from 'react';
import { cn } from '@asuras/utils';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';

export const InputOTP = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			'flex items-center gap-2 has-[:disabled]:opacity-50',
			containerClassName
		)}
		className={cn('disabled:cursor-not-allowed', className)}
		{...props}
	/>
));
InputOTP.displayName = 'InputOTP';

export const InputOTPGroup = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

export const InputOTPSlot = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				'border-input size-54 text-16 border-grey-divider relative flex items-center justify-center border-y border-r font-semibold transition-all first:rounded-l-md first:border-l last:rounded-r-md',
				isActive && 'ring-primary ring-offset-primary z-10 ring-2',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink bg-foreground h-24 w-px duration-1000" />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = 'InputOTPSlot';

export const InputOTPSeparator = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
	<div ref={ref} role="separator" {...props}>
		<Dot />
	</div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';
