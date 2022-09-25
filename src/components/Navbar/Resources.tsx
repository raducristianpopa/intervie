import React from 'react';

import Link from '~/components/ui/Link';

import UserMenu from './Menu';

interface ResourceLinkProps {
	name: string;
	href: string;
}

export const resources: ResourceLinkProps[] = [
	{ name: 'Contact', href: '/contact' },
	{ name: 'Changelog', href: '/changelog' }
];

const Resources = () => {
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
				<UserMenu />
			</div>
		</div>
	);
};

export default Resources;
