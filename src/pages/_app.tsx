import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { ApolloProvider } from '@apollo/client';
import Navbar from '@components/Navbar';
import '@style.css';
import { useApollo } from '@utils/apollo';

const App = ({ Component, pageProps }: AppProps & { pageProps: any }) => {
	const client = useApollo(pageProps.initialClientState);

	return (
		<ApolloProvider client={client}>
			<Navbar />
			<Component {...pageProps} />
		</ApolloProvider>
	);
};
export default App;
