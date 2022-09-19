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
						(leftContent || leftIcon) && 'rounded-l-none order-2',
						(rightContent || rightIcon) && 'rounded-r-none order-1',
						leftIcon && 'border-l-0 peer !pl-0',
						rightIcon && 'border-r-0 peer',
						'[-moz-appearance:none] text-sm rounded-md px-3 leading-6 h-10 text-inherit w-full min-w-0 inline-flex transition-colors ease-linear duration-150  border ring-0 focus:ring-0 bg-white text-black border-neutral-400 border-opacity-30  focus:border-opacity-80 focus:border-neutral-600 dark:bg-black	dark:text-white dark:border-neutral-300 dark:border-opacity-40 focus:dark:border-opacity-80 placeholder:font-extralight'
					)}
					type={type}
					ref={ref}
					id={props.name}
					{...props}
				/>

				{(leftContent || rightContent) && (
					<span
						className={clsx(
							leftContent && 'order-1 border-r-0 rounded-r-none',
							rightContent && 'order-2 border-l-0 rounded-l-none',
							'flex items-center px-3 text-sm leading-normal transition-colors duration-150 ease-linear border rounded-md  shrink-0 font-extralight bg-neutral-50 text-black text-opacity-50 dark:bg-stone-900 dark:text-white dark:text-opacity-40 dark:border-neutral-300 dark:border-opacity-30'
						)}
					>
						{leftContent || rightContent}
					</span>
				)}

				{(leftIcon || rightIcon) && (
					<span
						className={clsx(
							leftIcon && 'order-1 border-r-0 rounded-r-none',
							rightIcon && 'order-2 border-l-0 rounded-l-none',
							'flex items-center px-3 text-sm leading-normal transition-colors duration-150 ease-linear border rounded-md  shrink-0 font-extralight bg-white text-black text-opacity-50 border-neutral-400 border-opacity-30 peer-focus:border-opacity-80 peer-focus:border-neutral-600 dark:bg-black dark:text-white dark:text-opacity-40 dark:border-neutral-300 dark:border-opacity-40 dark:peer-focus:border-neutral-300 dark:peer-focus:border-opacity-80 '
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
