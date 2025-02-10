'use client';

import { ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, X } from 'lucide-react';

import { cn } from '../../utils';
import { Button } from '../button';
import { SearchSelectContext, useSearchSelectTrigger } from './context';

interface ISearchSelectInputProps {
	value: string;
	onChange: (e: string) => void;
}

export const SearchSelectList = ({ children, ...props }: { children: ReactNode }) => {
	const [show, setShow] = useState(false);
	const value = {
		show,
		setShow,
	};
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShow(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	return (
		<SearchSelectContext.Provider value={value}>
			<div ref={ref} className="relative">
				{children}
			</div>
		</SearchSelectContext.Provider>
	);
};

export const SearchSelectTrigger = ({ children, ...props }: { children: ReactNode }) => {
	const { setShow, show } = useSearchSelectTrigger();

	return (
		<div
			className={cn(
				'rounded-8 border-grey-light placeholder:text-muted-foreground focus:border-primary mt-6 flex h-[48px] w-full cursor-pointer items-center justify-between whitespace-nowrap border bg-transparent px-12 py-6 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
			)}
			onClick={() => setShow(!show)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="!size-16 opacity-50" />
		</div>
	);
};

export const SearchSelectLabel = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<span className="text-12 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
			{children}
		</span>
	);
};

export const SearchSelectContent = ({ children, ...props }: { children: ReactNode }) => {
	const { show } = useSearchSelectTrigger();

	if (show) {
		return (
			<div
				className="border-grey-light absolute z-[100] max-h-[280px] w-full overflow-y-scroll rounded-md border bg-white shadow-md"
				{...props}
			>
				{children}
			</div>
		);
	}
	return null;
};

export const SearchSelectInput = ({ value, onChange }: ISearchSelectInputProps) => {
	return (
		<div className="relative">
			<input
				type="search"
				className="rounded-8 h-42 w-full border-b py-8 pl-12 pr-32 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
				placeholder="Search for Products..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value.length > 0 && (
				<Button
					className="absolute right-8 top-1/2 -translate-y-1/2"
					variant="ghost"
					size="icon"
					onClick={() => onChange('')}
				>
					<X className="text-red-1 !size-16" />
				</Button>
			)}
		</div>
	);
};

export const SearchSelectOption = ({
	children,
	className,
	...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			type="button"
			className={cn(
				'text-14 hover:bg-accent hover:text-accent-foreground border-grey-divider relative flex w-full cursor-pointer select-none items-center border-b px-16 py-8 outline-none',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
