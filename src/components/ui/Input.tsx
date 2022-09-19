import { ComponentProps, forwardRef } from 'react';

import FieldError from './FieldError';

interface Props extends ComponentProps<'input'> {
	label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, type = 'text', ...props },
	ref
) {
	return (
		<div className="relative">
			<input
				className="w-full px-4 py-2 text-gray-300 placeholder-transparent rounded-md bg-neutral-900 peer disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20"
				type={type}
				ref={ref}
				id={props.name}
				{...props}
				placeholder={label}
			/>
			<label
				htmlFor={props.name}
				className="absolute  text-sm left-2 px-1 -top-2.5 transition-all peer-placeholder-shown:px-1 peer-placeholder-shown:text-gray-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:text-gray-300 peer-focus:font-extralight bg-neutral-900 peer-focus:px-1"
			>
				{label}
			</label>
			<FieldError name={props.name} />
		</div>
	);
});
