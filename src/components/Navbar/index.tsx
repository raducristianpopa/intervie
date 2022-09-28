import { gql, useQuery } from '@apollo/client';

import Link from '../ui/Link';
import { IconOnlyLogo } from '../ui/Logo';
import LoggedInScope, { LoggedInScopeFragment } from './LoggedInScope';
import LoggedOutScope from './LoggedOutScope';
import Resources, { ResourcesFragment } from './Resources';
import { NavbarQuery } from './__generated__/index.generated';

export const query = gql`
	query NavbarQuery {
		viewer {
			id
			...LoggedInScope_user
			...Resources_user
		}
	}

	${LoggedInScopeFragment}
	${ResourcesFragment}
`;

export const Navbar = () => {
	const { data } = useQuery<NavbarQuery>(query);

	return (
		<nav className="m-auto flex h-16 w-full max-w-[1248px] select-none items-center px-6 text-sm font-light text-zinc-500">
			<div className="z-[100] flex min-w-0 flex-1 items-center pr-6">
				<ol className="m-0 flex max-w-full list-none items-center p-0">
					{/* BEGIN Logo  */}
					<li className="flex min-w-0 flex-shrink-0 flex-grow-0 basis-auto">
						<Link href="/" className="relative -m-2 box-content block p-2">
							<IconOnlyLogo className="h-[30px] w-[30px] text-black dark:text-white" />
						</Link>
					</li>
					{/* END Logo */}

					{data && (data.viewer ? <LoggedInScope user={data?.viewer} /> : <LoggedOutScope />)}
				</ol>
			</div>
			<div className="flex flex-shrink-0 flex-grow-0 basis-0 justify-end">
				<Resources user={data && (data.viewer ? data.viewer : undefined)} />
			</div>
		</nav>
	);
};

export default Navbar;
