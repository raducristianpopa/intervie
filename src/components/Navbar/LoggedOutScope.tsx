import { TextOnlyLogo } from '../ui/Logo';

const LoggedOutScope = () => {
	return (
		<li className="ml-2 flex flex-shrink-0 flex-grow-0 basis-auto">
			<TextOnlyLogo className="h-[26px] w-[100px] text-black dark:text-white" />
		</li>
	);
};

export default LoggedOutScope;
