import Image from 'next/future/image';

const LoggedOutScope = () => {
	return (
		<li className="flex flex-grow-0 flex-shrink-0 ml-2 basis-auto">
			<Image src="/assets/images/intervie_text_only_white.svg" height={26} width="100" alt="" />
		</li>
	);
};

export default LoggedOutScope;
