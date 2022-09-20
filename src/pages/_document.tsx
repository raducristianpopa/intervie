import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="dark relative min-h-full max-w-[100vw] bg-black text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
