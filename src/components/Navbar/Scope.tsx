import Image from 'next/future/image';

import { gql, useQuery } from '@apollo/client';

import Link from '~/components/ui/Link';

import LoggedInScope from './LoggedInScope';
import { LoggedInScopeFragment } from './LoggedInScope';
import LoggedOutScope from './LoggedOutScope';
import { ScopeQuery, ScopeQueryVariables } from './__generated__/Scope.generated';

const query = gql`
	query ScopeQuery {
		viewer {
			id
			...LoggedInScope_user
		}
	}

	${LoggedInScopeFragment}
`;

const Scope = () => {
	const { data } = useQuery<ScopeQuery, ScopeQueryVariables>(query);
	return (
		<ol className="m-0 flex max-w-full list-none items-center p-0">
			{/* BEGIN Logo  */}
			<li className="flex min-w-0 flex-shrink-0 flex-grow-0 basis-auto">
				<Link href="/" className="relative -m-2 box-content block p-2">
					<Image
						className="!text-red-100"
						src="/assets/images/intervie_logo_only_white.svg"
						width={26}
						height={26}
						alt="Intervie Logo"
					/>
				</Link>
			</li>
			{/* END Logo */}
			{data && (data.viewer ? <LoggedInScope user={data.viewer} /> : <LoggedOutScope />)}
		</ol>
	);
};

export default Scope;
