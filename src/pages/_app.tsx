import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import '@style.css';
import { useApollo } from '@utils/apollo';

const App = ({ Component, pageProps }: AppProps & { pageProps: any }) => {
	const client = useApollo(pageProps.initialClientState);
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
};
export default App;
