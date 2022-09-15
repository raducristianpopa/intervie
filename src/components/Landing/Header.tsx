import Image from 'next/image';

import Link from '@components/ui/Link';

const Header = () => {
	return (
		<div className="sticky top-0 flex justify-center w-full max-w-full z-[101] h-16 bg-black bg-opacity-50">
			<header className="flex align-center w-[1024px] px-6 m-auto">
				<div className="flex flex-1 justify-center align-center">
					{/* LOGO - START */}
					<div className="inline-flex relative">
						<Link href="/">
							<Image
								src="/intervie_full_white_logo_364x100.svg"
								alt="Intervie Logo"
								width={114}
								height={34}
							/>
						</Link>
					</div>
					{/* LOGO - END */}
				</div>
				{/* Menu - START */}
				<div className="flex flex-1 justify-center items-center m-0 w-full">
					<ul className="flex items-center justify-center list-none m-0 p-0 transition-opacity duration-200 ease-in-out will-change-[opacity]"></ul>
				</div>
				{/* Menu - END */}
			</header>
		</div>
	);
};

export default Header;
