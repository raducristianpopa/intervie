import Image from 'next/future/image';

import Divider from '@components/ui/Divider';
import Link from '@components/ui/Link';

import LoggedInScope from './LoggedInScope';
import LoggedOutScope from './LoggedOutScope';

const Scope = () => {
	return (
		<ol className="m-0 flex max-w-full list-none items-center p-0">
			{/* BEGIN Logo  */}
			<li className="flex min-w-0 flex-shrink-0 flex-grow-0 basis-auto">
				<Link href="/" className="relative -m-2 box-content block p-2">
					<Image
						className="!text-red-100"
						src="/assets/images/intervie_logo_only_white.svg"
						width={26}
						height={26}
						alt="Intervie Logo"
					/>
				</Link>
			</li>
			{/* END Logo */}
		</ol>
	);
};

export default Scope;
