import { Menu, Transition } from '@headlessui/react';

import { Button } from '../ui/Button';
import Link from '../ui/Link';

const DropdownCreateNew = () => {
	return (
		<div className="ml-6">
			<Menu as="div" className="relative block text-left">
				<div>
					<Menu.Button as="span">
						<Button
							aria-label="Create new workspace or organization"
							size="lg"
							variant="primary"
							className="min-w-[160px]"
						>
							Create new ...
						</Button>
					</Menu.Button>
					<Transition
						as="div"
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-full origin-top-right bg-white shadow-lg dark:bg-black ">
							<div className="m-0 rounded-md border border-neutral-300 border-opacity-50 p-2 text-zinc-500 outline-none">
								<Menu.Item>
									<Link
										className="flex h-10 cursor-pointer items-center rounded-md px-3 font-light outline-none hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white"
										href="/setting/workspace"
									>
										Workspace
									</Link>
								</Menu.Item>
								<Link
									className="flex h-10 cursor-pointer items-center rounded-md px-3 font-light outline-none hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white"
									href="/add/organization"
								>
									Organization
								</Link>
							</div>
						</Menu.Items>
					</Transition>
				</div>
			</Menu>
		</div>
	);
};

export default DropdownCreateNew;
