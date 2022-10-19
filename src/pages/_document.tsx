import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="relative h-screen min-h-full max-w-[100vw] bg-white text-black dark:bg-black dark:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
