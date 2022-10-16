import { useRouter } from 'next/router';

import clsx from 'clsx';
import { CaretLeft } from 'phosphor-react';

import Link from '../ui/Link';

interface Props {
	hasTab: boolean;
}

interface SidebarLinkProps {
	name: string;
	href: string;
	default?: boolean;
}

const sidebarLinks: SidebarLinkProps[] = [
	{
		name: 'General',
		href: '/settings/general',
		default: true
	},
	{
		name: 'Security',
		href: '/settings/security'
	},
	{
		name: 'Devices',
		href: '/settings/devices'
	}
];

const SideMenu = ({ hasTab }: Props) => {
	const router = useRouter();

	return (
		<div className="relative flex w-full flex-col md:w-auto">
			<div className="sticky top-[64px] w-full max-w-full font-extralight text-zinc-500 md:mr-6 md:w-[180px]">
				<Link
					href="/settings"
					className={clsx(
						hasTab
							? '-mx-6 block border-b border-neutral-200 p-6 font-medium text-black dark:border-neutral-800 dark:text-white md:hidden'
							: 'hidden'
					)}
				>
					<div className="group flex items-center justify-start space-x-2">
						<CaretLeft size={18} />
						<span className="group-hover:underline">Account Settings</span>
					</div>
				</Link>
				<div className={clsx(hasTab && 'hidden md:block', '-mx-6 md:mx-0')}>
					{sidebarLinks.map((link) => (
						<Link
							key={link.name}
							className={clsx(
								link.href === router.pathname && 'font-light text-black dark:text-white',
								link.default &&
									link.href === router.pathname &&
									'font-light text-black dark:text-white',
								'borde,r-b block cursor-pointer items-center border-neutral-200 px-8 py-4 outline-none dark:border-neutral-800 md:flex md:h-10 md:rounded-md md:border-0 md:px-3 md:py-0 md:hover:bg-neutral-200 md:hover:text-black dark:md:hover:bg-neutral-900 dark:md:hover:text-white'
							)}
							href={link.href}
						>
							{link.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
