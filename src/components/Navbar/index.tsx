import Links from './Links';
import Scope from './Scope';

export const Navbar = () => {
	return (
		<nav className="m-auto flex h-16 w-full max-w-[1248px] items-center px-6 text-sm font-light text-zinc-500 [user-select:none]">
			<div className="z-[100] flex min-w-0 flex-1 items-center pr-6">
				<Scope />
			</div>
			<div className="flex flex-shrink-0 flex-grow-0 basis-0 justify-end">
				<Links />
			</div>
		</nav>
	);
};

export default Navbar;
