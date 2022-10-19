import { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
	title?: string;
	children: ReactNode;
	variant?: 'danger';
}

const Card = ({ title, children, variant }: Props) => {
	return (
		<div
			className={clsx(
				'relative rounded-md border border-neutral-200 bg-white  dark:bg-black',
				variant === 'danger' ? 'border-red-600' : 'border-neutral-200 dark:border-neutral-800'
			)}
		>
			<div className="flex flex-col p-6">
				<h4 className="text-2xl font-medium ">{title}</h4>
				{children}
			</div>
		</div>
	);
};

export default Card;
