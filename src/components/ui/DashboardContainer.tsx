import { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
	background: 'black' | 'neutral';
	children: ReactNode;
}

const DashboardContainer = ({ background, children }: Props) => {
	return (
		<>
			<div className="min-h-screen text-sm leading-6">
				<div
					className={clsx(
						'flex min-h-screen flex-col items-stretch justify-start',
						background === 'black'
							? 'bg-white dark:bg-black'
							: 'bg-neutral-100 bg-opacity-70 dark:bg-neutral-900'
					)}
				>
					<div className="mx-auto w-[1248px] max-w-full px-6">{children}</div>
				</div>
			</div>
		</>
	);
};

export default DashboardContainer;
