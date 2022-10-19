import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import Navbar from '~/components/Navbar';
import { NProgress } from '~/components/ui/NProgress';
import '~/style.css';
import { useApollo } from '~/utils/apollo';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
	pageProps: any;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	const client = useApollo(pageProps.initialClientState);
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
			</Head>
			<ApolloProvider client={client}>
				<ThemeProvider
					storageKey="preferred-theme"
					defaultTheme="system"
					attribute="class"
					enableSystem
				>
					<NProgress />
					<Navbar />
					{getLayout(<Component {...pageProps} />)}
					<Toaster position="top-center" />
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
};
export default App;
