import React from 'react';

import { gql } from '@apollo/client';

import Link from '~/components/ui/Link';

import UserMenu from './Menu';
import { Resources_User } from './__generated__/Resources.generated';

export const ResourcesFragment = gql`
	fragment Resources_user on User {
		id
	}
`;

interface ResourcesProps {
	user: Resources_User | undefined;
}

interface ResourceLinkProps {
	name: string;
	href: string;
}

export const resources: ResourceLinkProps[] = [
	{ name: 'Contact', href: '/contact' },
	{ name: 'Changelog', href: '/changelog' }
];

const Resources = ({ user }: ResourcesProps) => {
	return (
		<div className="flex items-center">
			<div className="flex items-center">
				{resources.map((resource) => (
					<Link
						key={resource.name}
						href={resource.href}
						className="hidden p-2 transition-colors duration-200 ease-linear hover:text-black dark:hover:text-white sm:block"
					>
						{resource.name}
					</Link>
				))}
				{user && <UserMenu />}
			</div>
		</div>
	);
};

export default Resources;
