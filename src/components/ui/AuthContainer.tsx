import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const AuthContainer = ({ children }: Props) => {
	return (
		<>
			<div className="flex min-h-[calc(100vh-(64px))] flex-col justify-center">
				<div className="relative flex w-full max-w-xl flex-1 flex-col items-center justify-center self-center p-6">
					{children}
				</div>
			</div>
		</>
	);
};

export default AuthContainer;
