import { Fragment } from 'react';

import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { List, X } from 'phosphor-react';

import Avatar from '~/components/ui/Avatar';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const UserMenu = () => {
	const router = useRouter();

	return (
		<Disclosure as="div" className="pl-2">
			{({ open }) => (
				<>
					<DesktopMenu />
					{/* BEGIN Mobile menu button */}
					<div className="flex sm:hidden">
						<Disclosure.Button className="inline-flex items-center justify-center text-black dark:text-white">
							<span className="sr-only">Open main menu</span>
							{open ? (
								<X width={26} height={26} aria-hidden="true" />
							) : (
								<List width={26} height={26} aria-hidden="true" />
							)}
						</Disclosure.Button>
					</div>
					{/* END Mobile menu button */}
					<MobileMenu />
				</>
			)}
		</Disclosure>
	);
};

export default UserMenu;
