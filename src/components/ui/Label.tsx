import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'label'> {
	content: ReactNode;
}

export const Label = ({ htmlFor, content, ...props }: Props) => {
	return (
		<label
			htmlFor={htmlFor}
			className="block w-full mb-2 text-xs font-medium uppercase text-neutral-500"
			{...props}
		>
			{content}
		</label>
	);
};
