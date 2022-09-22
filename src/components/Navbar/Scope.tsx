import Image from 'next/future/image';

import { gql, useQuery } from '@apollo/client';

import Link from '~/components/ui/Link';

import { IconOnlyLogo } from '../ui/Logo';
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
					<IconOnlyLogo className="h-[26px] w-[26px] text-white" />
				</Link>
			</li>
			{/* END Logo */}
			{data && (data.viewer ? <LoggedInScope user={data.viewer} /> : <LoggedOutScope />)}
		</ol>
	);
};

export default Scope;
