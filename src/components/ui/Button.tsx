import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

import { ReactNode, forwardRef } from 'react';

import { Transition } from '@headlessui/react';

import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';
import { Spinner } from './Spinner';

const button = cva(
	[
		'border',
		'px-3',
		'rounded-lg',
		'flex',
		'items-center',
		'justify-center',
		'transition-all',
		'ease-linear',
		'duration-150',
		'overflow-hidden',
		'disabled:opacity-75',
		'disabled:pointer-events-none'
	],
	{
		variants: {
			variant: {
				primary: [
					// Light theme
					'bg-black',
					'text-white',
					'border-black',
					'hover:bg-white',
					'hover:text-black',
					// Dark theme
					'dark:bg-white',
					'dark:text-black',
					'dark:border-white',
					'dark:hover:bg-black',
					'dark:hover:text-white'
				],
				secondary: [
					// Light theme
					'bg-neutral-100',
					'bg-opacity-20',
					'text-black',
					'text-opacity-70',
					'border-neutral-400',
					'border-opacity-30',
					'hover:border-black',
					'hover:border-opacity-60',
					'hover:text-opacity-100',
					// Dark theme
					'dark:bg-black',
					'dark:text-white',
					'dark:text-opacity-50',
					'dark:border-neutral-300',
					'dark:border-opacity-50',
					'dark:hover:border-opacity-100',
					'dark:hover:text-opacity-100'
				],
				danger: [
					'bg-red-600',
					'text-white',
					'border-red-600',
					'hover:bg-transparent',
					'hover:text-red-600'
				],
				success: [
					'bg-blue-600',
					'text-white',
					'border-blue-600',
					'hover:bg-transparent',
					'hover:text-blue-600'
				]
			},
			size: {
				sm: ['h-8', 'text-sm'],
				lg: ['h-10', 'text-base']
			}
		},
		defaultVariants: {
			size: 'sm'
		}
	}
);

export interface ButtonProps extends VariantProps<typeof button>, ButtonOrLinkProps {
	['aria-label']: string;
	leftIcon?: ReactNode;
	children?: ReactNode;
	rightIcon?: ReactNode;
	isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ variant, size, isLoading, leftIcon, rightIcon, children, className, ...props },
	ref
) {
	return (
		<ButtonOrLink className={clsx(className, button({ variant, size }))} {...props} ref={ref}>
			<Transition
				show={!!isLoading}
				enter="transition-all"
				enterFrom="w-0 opacity-0"
				enterTo="w-6 opacity-100"
				leave="transition-all"
				leaveFrom="w-6 opacity-100"
				leaveTo="w-0 opacity-0"
			>
				<div className="mr-2">
					<Spinner />
				</div>
			</Transition>
			<div className="flex items-center justify-center gap-2">
				{!isLoading && leftIcon && <div>{leftIcon}</div>}
				<div>{isLoading ? 'Loading' : children}</div>
				{!isLoading && rightIcon && <div>{rightIcon}</div>}
			</div>
		</ButtonOrLink>
	);
});
