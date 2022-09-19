import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/ui/Button';
import Link from '@components/ui/Link';

const Header: React.FC<{}> = () => {
	const router = useRouter();

	const showMenu = router.pathname === '/' ? true : false;
	const isLoginPage = router.pathname === '/login' ? true : false;
	const isSignUpPage = router.pathname === '/signup' ? true : false;

	return (
		<div className="sticky top-0 z-[101] flex h-16 w-full max-w-full justify-center bg-black">
			<header className="m-auto flex w-full max-w-[1248px] items-center px-6 text-sm font-light">
				{/* LOGO - START */}
				<div className="flex flex-1 items-center">
					<Link href="/" className="relative -m-1 inline-flex items-center p-2">
						<Image
							src="/assets/images/intervie_full_white_logo_364x100.svg"
							alt="Intervie Logo"
							width={113.6}
							height={26}
						/>
					</Link>
				</div>
				{/* LOGO - END */}
				{/* Menu - START */}
				{showMenu && (
					<div className="m-0 flex w-full flex-1 items-center justify-center">
						<ul className="m-0 flex list-none items-center justify-center p-0 transition-opacity duration-200 ease-in-out will-change-[opacity]">
							<li>
								<Link
									href="/features"
									className="inline-block cursor-pointer p-4 text-zinc-500 no-underline outline-none transition-colors duration-100 ease-in hover:text-white"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="inline-block cursor-pointer p-4 text-zinc-500 no-underline outline-none transition-colors duration-100 ease-in hover:text-white"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="inline-block cursor-pointer p-4 text-zinc-500 no-underline outline-none transition-colors duration-100 ease-in hover:text-white"
								>
									About us
								</Link>
							</li>
						</ul>
					</div>
				)}
				{/* Menu - END */}
				{/* Login Menu - START */}
				<div className="flex flex-1 items-center justify-center">
					<div className="ml-auto">
						<div className="flex items-center">
							<Link
								href="/contact"
								className="cursor-pointer text-zinc-500 no-underline outline-none transition-colors duration-100 ease-in hover:text-white"
							>
								Contact
							</Link>
							{!isLoginPage && (
								<Link
									href="/login"
									className="ml-6 cursor-pointer text-zinc-500 no-underline outline-none transition-colors duration-100 ease-in hover:text-white"
								>
									Login
								</Link>
							)}
							<Button className="ml-6" href="/signup" aria-label="Sign up">
								Sign up
							</Button>
						</div>
					</div>
				</div>
				{/* Login Menu - END */}
			</header>
		</div>
	);
};

export default Header;
