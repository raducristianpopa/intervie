import { ReactNode } from 'react';

interface Props {
	status?: string;
	children?: ReactNode;
}

const CardFooter = ({ children, status }: Props) => {
	return (
		<footer className="relative -m-6 flex  min-h-[56px] items-center rounded-b-md bg-neutral-100 px-6 py-3 font-light leading-7 text-zinc-500 dark:bg-neutral-900 dark:bg-opacity-70">
			<span>{status}</span>
			<div className="ml-auto flex items-center justify-end">{children}</div>
		</footer>
	);
};

export default CardFooter;
