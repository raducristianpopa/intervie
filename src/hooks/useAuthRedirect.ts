import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useApolloClient } from '@apollo/client';

export function useAuthRedirect() {
	const client = useApolloClient();
	const router = useRouter();

	return useCallback(() => {
		client.resetStore();
		router.push((router.query.redirect as string) ?? '/');
	}, [client, router]);
}
