import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { ApolloProvider } from '@apollo/client';
import Navbar from '@components/Navbar';
import '@style.css';
import { useApollo } from '@utils/apollo';

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
		<ApolloProvider client={client}>
			<Navbar />
			{getLayout(<Component {...pageProps} />)}
		</ApolloProvider>
	);
};
export default App;
