import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const DashboardContainer = ({ children }: Props) => {
	return (
		<>
			<div className="min-h-screen text-sm leading-6">
				<div className="flex min-h-screen flex-col items-stretch justify-start bg-neutral-100 bg-opacity-70 dark:bg-neutral-900">
					<div className="mx-auto w-[1248px] max-w-full px-6">{children}</div>
				</div>
			</div>
		</>
	);
};

export default DashboardContainer;
