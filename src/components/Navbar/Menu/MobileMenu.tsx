import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Disclosure } from '@headlessui/react';

import Link from '~/components/ui/Link';
import { useAuthRedirect } from '~/hooks/useAuthRedirect';

import { resources } from '../Resources';
import { generalMenuItems } from './DesktopMenu';
import ThemeChanger from './ThemeChanger';

const MobileMenu = () => {
	const authRedirect = useAuthRedirect();
	const [logOut] = useMutation(
		gql`
			mutation MobileMenuLogoutMutation {
				logOut
			}
		`,
		{
			onCompleted() {
				authRedirect();
			}
		}
	);
	return (
		<Disclosure.Panel
			as="nav"
			className="absolute left-0 right-0 bottom-0 top-[64px] z-50 bg-white dark:bg-black sm:hidden"
		>
			<div className="px-2 pt-2 pb-3 sm:px-3">
				{generalMenuItems.map((item) => (
					<Link key={item.name} href={item.href}>
						<Disclosure.Button
							as="div"
							className="block border-b border-neutral-200 bg-white px-5 py-3 text-base text-zinc-500 hover:bg-zinc-100 hover:text-black dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900 dark:hover:text-white"
						>
							{item.name}
						</Disclosure.Button>
					</Link>
				))}
				<Link className="w-full text-left" onClick={() => logOut()}>
					<div className="block border-b border-neutral-200 bg-white px-5 py-3 text-base text-zinc-500 hover:bg-zinc-100 hover:text-black dark:border-neutral-800 dark:bg-black	dark:hover:bg-neutral-900 dark:hover:text-white ">
						Logout
					</div>
				</Link>
				<p className="mt-8 mb-5 px-5 text-lg font-medium text-black dark:text-white">Resources</p>
				{resources.map((resource) => (
					<Link key={resource.name} href={resource.href}>
						<Disclosure.Button
							as="div"
							className="block border-b border-neutral-200 bg-white px-5 py-3 text-base text-zinc-500 hover:bg-zinc-100 hover:text-black dark:border-neutral-800 dark:bg-black	dark:hover:bg-neutral-900 dark:hover:text-white "
						>
							{resource.name}
						</Disclosure.Button>
					</Link>
				))}
				<div className="mt-5">
					<ThemeChanger />
				</div>
			</div>
		</Disclosure.Panel>
	);
};

export default MobileMenu;
