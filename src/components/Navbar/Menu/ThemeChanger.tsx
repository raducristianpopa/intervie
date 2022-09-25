import React, { ReactNode } from 'react';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Desktop, Moon, Sun } from 'phosphor-react';

interface ThemesProps {
	value: string;
	rep: ReactNode;
	styling: string;
}

const themes: ThemesProps[] = [
	{ value: 'dark', rep: <Moon size={20} />, styling: 'border rounded-l-md' },
	{ value: 'system', rep: <Desktop size={20} />, styling: 'border-y' },
	{ value: 'light', rep: <Sun size={20} />, styling: 'border rounded-r-md' }
];

const ThemeChanger = () => {
	const { theme: currentTheme, setTheme } = useTheme();

	const clickHandler = (theme: string) => {
		setTheme(theme);
	};

	return (
		<div className="max-w-full bg-white py-2 px-5 text-sm leading-5 text-zinc-500 transition-colors duration-100 ease-linear dark:bg-black">
			<div className="flex flex-row items-center justify-center space-x-4">
				<p>Theme</p>
				<div className="flex">
					{themes.map((theme) => (
						<div
							key={theme.value}
							onClick={() => clickHandler(theme.value)}
							className={clsx(
								theme.styling,
								currentTheme === theme.value &&
									'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white',
								'basis-1/3 cursor-pointer border-neutral-200 p-2 hover:text-black dark:border-neutral-800 dark:hover:text-white'
							)}
						>
							{theme.rep}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ThemeChanger;
