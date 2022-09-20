import React from 'react';

import Link from '~/components/ui/Link';

interface NavbarLinksProps {
	name: string;
	path: string;
}

const navbarLinks: NavbarLinksProps[] = [
	{ name: 'Contact', path: '/contact' },
	{ name: 'Changelog', path: '/changelog' }
];

const Links = () => {
	return (
		<div className="flex items-center">
			<div className="mr-2 flex items-center">
				{navbarLinks.map((link) => (
					<Link
						key={link.name}
						href={link.path}
						className="p-2 transition-colors duration-200 ease-linear hover:text-white"
					>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Links;
