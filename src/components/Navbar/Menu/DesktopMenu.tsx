import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Menu } from '@headlessui/react';

import Link from '~/components/ui/Link';
import { useAuthRedirect } from '~/hooks/useAuthRedirect';

import ThemeChanger from './ThemeChanger';

interface MenuItemProps {
	name: string;
	href: string;
}

export const generalMenuItems: MenuItemProps[] = [
	{ name: 'Dashboard', href: '/' },
	{ name: 'Settings', href: '/settings' }
];

const DesktopMenu = () => {
	const authRedirect = useAuthRedirect();
	const [logOut] = useMutation(
		gql`
			mutation DesktopMenuLogoutMutation {
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
		<div className="py-1">
			{generalMenuItems.map((item) => (
				<Menu.Item key={item.name}>
					<Link href={item.href}>
						<div className="max-w-full cursor-pointer bg-white py-2 px-5 text-sm	leading-5 text-zinc-500 transition-colors duration-100 ease-linear hover:bg-zinc-100 hover:text-black dark:bg-black dark:hover:bg-neutral-900 dark:hover:text-white">
							{item.name}
						</div>
					</Link>
				</Menu.Item>
			))}
			<div className="my-2 border border-neutral-200 dark:border-neutral-800" />
			<ThemeChanger />
			<div className="my-2 border border-neutral-200 dark:border-neutral-800" />
			<Menu.Item as="div">
				<Link className="w-full text-left" onClick={() => logOut()}>
					<div className="max-w-full bg-white py-2 px-5 text-sm	 leading-5 text-zinc-500 transition-colors duration-100 ease-linear hover:bg-zinc-100 hover:text-black dark:bg-black dark:hover:bg-neutral-900 dark:hover:text-white">
						Logout
					</div>
				</Link>
			</Menu.Item>
		</div>
	);
};

export default DesktopMenu;
