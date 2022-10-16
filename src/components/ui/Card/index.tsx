import { ReactNode } from 'react';

interface Props {
	title?: string;
	children: ReactNode;
}

const Card = ({ title, children }: Props) => {
	return (
		<div className="relative rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
			<div className="flex flex-col space-y-4 p-6">
				<h4 className="text-2xl font-medium ">{title}</h4>
				{children}
			</div>
		</div>
	);
};

export default Card;
