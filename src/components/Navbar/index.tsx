import Links from './Links';
import Scope from './Scope';

export const Navbar = () => {
	return (
		<nav className="flex items-center max-w-[1248px] h-16 w-full px-6 m-auto text-sm font-light [user-select:none] text-zinc-500">
			<div className="flex flex-1 items-center pr-6 min-w-0 z-[100]">
				<Scope />
			</div>
			<div className="flex justify-end flex-grow-0 flex-shrink-0 basis-0">
				<Links />
			</div>
		</nav>
	);
};

export default Navbar;
