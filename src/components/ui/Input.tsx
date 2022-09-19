import clsx from 'clsx';

import { ComponentProps, ReactNode, forwardRef } from 'react';

import FieldError from './FieldError';
import { Label } from './Label';

// The _MutuallyExclude_ type will create "exclusive properties".
// In our case, we can onlye use ONE property from the _CustomProps_ interface or none.
// eg1: <Input /> - OK
// eg2: <Input leftContent=... /> - OK
// eg3: <Input leftContent=... rightContent /> - ERROR

type MutuallyExclude<T, E extends keyof T> =
	| {
			[K in E]: { [P in K]: T[P] } & Omit<T, E> & {
					[P in Exclude<E, K>]?: never;
				} extends infer O
				? { [P in keyof O]: O[P] }
				: never;
	  }[E]
	| ({ [K in E]?: never } & Omit<T, E>);

interface BaseProps extends ComponentProps<'input'> {
	label?: string;
}

interface CustomProps {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	leftContent?: ReactNode;
	rightContent?: ReactNode;
}

type ExclusiveProps = 'leftIcon' | 'rightIcon' | 'leftContent' | 'rightContent';
type Props = BaseProps & MutuallyExclude<CustomProps, ExclusiveProps>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, type = 'text', leftIcon, rightIcon, leftContent, rightContent, ...props },
	ref
) {
	return (
		<div className="flex flex-col">
			{label && <Label htmlFor={props.name} content={label} />}
			<div className="flex max-w-full">
				<input
					className={clsx(
						(leftContent || leftIcon) && 'order-2 rounded-l-none',
						(rightContent || rightIcon) && 'order-1 rounded-r-none',
						leftIcon && 'peer border-l-0 !pl-0',
						rightIcon && 'peer border-r-0',
						'inline-flex h-10 w-full min-w-0 rounded-md border border-neutral-400 border-opacity-30 bg-white px-3 text-sm leading-6 text-inherit  text-black ring-0 transition-colors duration-150 ease-linear [-moz-appearance:none] placeholder:font-extralight  focus:border-neutral-600 focus:border-opacity-80 focus:ring-0	dark:border-neutral-300 dark:border-opacity-40 dark:bg-black dark:text-white focus:dark:border-opacity-80'
					)}
					type={type}
					ref={ref}
					id={props.name}
					{...props}
				/>

				{(leftContent || rightContent) && (
					<span
						className={clsx(
							leftContent && 'order-1 rounded-r-none border-r-0',
							rightContent && 'order-2 rounded-l-none border-l-0',
							'flex shrink-0 items-center rounded-md border bg-neutral-50 px-3 text-sm font-extralight leading-normal  text-black text-opacity-50 transition-colors duration-150 ease-linear dark:border-neutral-300 dark:border-opacity-30 dark:bg-stone-900 dark:text-white dark:text-opacity-40'
						)}
					>
						{leftContent || rightContent}
					</span>
				)}

				{(leftIcon || rightIcon) && (
					<span
						className={clsx(
							leftIcon && 'order-1 rounded-r-none border-r-0',
							rightIcon && 'order-2 rounded-l-none border-l-0',
							'flex shrink-0 items-center rounded-md border border-neutral-400 border-opacity-30 bg-white px-3 text-sm  font-extralight leading-normal text-black text-opacity-50 transition-colors duration-150 ease-linear peer-focus:border-neutral-600 peer-focus:border-opacity-80 dark:border-neutral-300 dark:border-opacity-40 dark:bg-black dark:text-white dark:text-opacity-40 dark:peer-focus:border-neutral-300 dark:peer-focus:border-opacity-80 '
						)}
					>
						{leftIcon || rightIcon}
					</span>
				)}
			</div>
			<FieldError name={props.name} />
		</div>
	);
});
