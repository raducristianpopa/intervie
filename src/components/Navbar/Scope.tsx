import Image from 'next/future/image';

import Divider from '@components/ui/Divider';
import Link from '@components/ui/Link';

import LoggedInScope from './LoggedInScope';
import LoggedOutScope from './LoggedOutScope';

const Scope = () => {
	return (
		<ol className="flex items-center max-w-full p-0 m-0 list-none">
			{/* BEGIN Logo  */}
			<li className="flex flex-grow-0 flex-shrink-0 min-w-0 basis-auto">
				<Link href="/" className="box-content relative block p-2 -m-2">
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
