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
		<div className="sticky top-0 flex justify-center w-full max-w-full z-[101] h-16 bg-black">
			<header className="flex items-center max-w-[1248px] w-full px-6 m-auto text-sm font-light">
				{/* LOGO - START */}
				<div className="flex items-center flex-1">
					<Link href="/" className="relative inline-flex items-center p-2 -m-1">
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
					<div className="flex items-center justify-center flex-1 w-full m-0">
						<ul className="flex items-center justify-center list-none m-0 p-0 transition-opacity duration-200 ease-in-out will-change-[opacity]">
							<li>
								<Link
									href="/features"
									className="inline-block p-4 no-underline transition-colors duration-100 ease-in outline-none cursor-pointer text-zinc-500 hover:text-white"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="inline-block p-4 no-underline transition-colors duration-100 ease-in outline-none cursor-pointer text-zinc-500 hover:text-white"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="inline-block p-4 no-underline transition-colors duration-100 ease-in outline-none cursor-pointer text-zinc-500 hover:text-white"
								>
									About us
								</Link>
							</li>
						</ul>
					</div>
				)}
				{/* Menu - END */}
				{/* Login Menu - START */}
				<div className="flex items-center justify-center flex-1">
					<div className="ml-auto">
						<div className="flex items-center">
							<Link
								href="/contact"
								className="no-underline transition-colors duration-100 ease-in outline-none cursor-pointer text-zinc-500 hover:text-white"
							>
								Contact
							</Link>
							{!isLoginPage && (
								<Link
									href="/login"
									className="ml-6 no-underline transition-colors duration-100 ease-in outline-none cursor-pointer text-zinc-500 hover:text-white"
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
