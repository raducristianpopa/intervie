import { gql } from '@apollo/client';

import Divider from '~/components/ui/Divider';
import Link from '~/components/ui/Link';

import { LoggedInScope_User } from './__generated__/LoggedInScope.generated';

export const LoggedInScopeFragment = gql`
	fragment LoggedInScope_user on User {
		email
		displayName
	}
`;

interface LoggedInScopeProps {
	user: LoggedInScope_User;
}

const LoggedInScope = ({ user }: LoggedInScopeProps) => {
	return (
		<>
			{/* BEGIN Divider */}
			<li className="ml-2 flex flex-shrink-0 flex-grow-0 basis-auto">
				<Divider />
			</li>
			{/* END Divider */}
			{/* BEGIN User */}
			<li className="flex min-w-0 flex-shrink flex-grow-0 basis-auto">
				<div className="flex max-w-full items-center justify-start">
					<Link href="/" className="flex max-w-full items-center justify-start">
						{/* BEGIN Name */}
						<p className="inline-block min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 font-medium leading-5 text-white">
							{user.displayName || user.email}
						</p>
						{/* END Name */}
						{/* BEGIN Plan */}
						<div className="hidden md:block">
							<span className="inline-flex h-5 items-center whitespace-nowrap rounded-full bg-white px-2 text-xs font-medium capitalize leading-none text-black">
								PLAN
							</span>
						</div>
						{/* END Plan */}
					</Link>
				</div>
			</li>
			{/* END User */}
		</>
	);
};

export default LoggedInScope;
