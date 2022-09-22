import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="relative min-h-full max-w-[100vw] bg-white text-white dark:bg-black">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
