import { useRouter } from 'next/router';

import clsx from 'clsx';

import Link from '../ui/Link';

interface LinksProps {
	name: string;
	href: string;
}

const links: LinksProps[] = [
	{ name: 'Workspaces', href: '/' },
	{ name: 'Settings', href: '/settings' }
];

const SubMenu = () => {
	const router = useRouter();

	return (
		<>
			<div className="border-b border-neutral-800">
				<div className="relative -mt-[10px] h-12 overflow-hidden">
					<div className="mx-auto mt-auto flex h-12 w-[1248px] max-w-full -translate-x-3 items-end overflow-auto px-6 [scrollbar-width:none]">
						<div className="flex flex-grow items-center">
							<div className="flex text-sm font-light text-zinc-500">
								{links.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className={clsx(
											router.pathname === link.href
												? 'font-normal text-white after:absolute after:bottom-0 after:left-[10px] after:right-[10px] after:block after:h-0 after:border-b-2 after:border-white'
												: 'hover:text-white',
											'relative inline-block select-none py-4 px-3 outline-0 transition-colors duration-200 ease-linear '
										)}
										// className="hover:font-normal "
									>
										{link.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubMenu;
