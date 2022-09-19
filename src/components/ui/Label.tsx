import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'label'> {
	content: ReactNode;
}

export const Label = ({ htmlFor, content, ...props }: Props) => {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-2 block w-full text-xs font-medium uppercase text-neutral-500"
			{...props}
		>
			{content}
		</label>
	);
};
