'use client';

import { type ReactNode } from 'react';

import { cn } from '../../utils';
import { Command, CommandInput } from '../command';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';

interface IAutoSearchProps {
	searchValue: string;
	onSearchValueChange: (s: string) => void;
	children: ReactNode;
	placeholder: string;
	className?: string;
	open: boolean;
	setOpen: (o: boolean) => void;
	inputClasses?: string;
}

export function AutoSearch({
	searchValue,
	onSearchValueChange,
	children,
	placeholder,
	className,
	open,
	setOpen,
	inputClasses,
}: IAutoSearchProps) {
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<Command className={cn('max-w-[320px]', className)}>
				<PopoverAnchor asChild>
					<CommandInput
						value={searchValue}
						onValueChange={onSearchValueChange}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						className={cn(inputClasses)}
					/>
				</PopoverAnchor>
				<PopoverContent className="w-[--radix-popover-trigger-width] p-0">
					{children}
				</PopoverContent>
			</Command>
		</Popover>
	);
}
