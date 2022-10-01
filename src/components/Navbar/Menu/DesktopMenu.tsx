import { Fragment } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';

import Avatar from '~/components/ui/Avatar';
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
					</Menu.Items>

					{/* END Desktop menu */}
				</Transition>
			</Menu>
		</div>
	);
};

export default DesktopMenu;
