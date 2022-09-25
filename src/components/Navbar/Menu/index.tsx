import React, { Fragment } from 'react';

import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { List, X } from 'phosphor-react';

import Avatar from '~/components/ui/Avatar';

import DesktopMenu, { generalMenuItems } from './DesktopMenu';
import MobileMenu from './MobileMenu';

const UserMenu = () => {
	const router = useRouter();

	return (
		<Disclosure as="div" className="pl-2">
			{({ open }) => (
				<>
					<div className="hidden sm:flex">
						<Menu as="div" className="relative inline-block items-center">
							<div>
								<Menu.Button className="flex max-w-xs items-center rounded-full text-sm">
									<span className="sr-only">Open user menu</span>
									<Avatar />
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								{/* BEGIN Desktop menu */}
								<Menu.Items
									as="div"
									className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-black"
								>
									<DesktopMenu />
								</Menu.Items>

								{/* END Desktop menu */}
							</Transition>
						</Menu>
					</div>
					<div className="flex sm:hidden">
						{/* BEGIN Mobile menu button */}
						<Disclosure.Button className="inline-flex items-center justify-center text-black dark:text-white">
							<span className="sr-only">Open main menu</span>
							{open ? (
								<X width={26} height={26} aria-hidden="true" />
							) : (
								<List width={26} height={26} aria-hidden="true" />
							)}
						</Disclosure.Button>
						{/* END Mobile menu button */}
					</div>
					<MobileMenu />
				</>
			)}
		</Disclosure>
	);
};

export default UserMenu;
