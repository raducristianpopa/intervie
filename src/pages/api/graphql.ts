import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	shouldRenderGraphiQL
} from 'graphql-helix';
import { IncomingHttpHeaders } from 'http';

import { NextApiHandler } from 'next';

import { Context, createGraphQLContext } from '~/graphql/builder';
import { schema } from '~/graphql/index';
import { resolveSession } from '~/utils/sessions';

interface GraphQLRequest {
	body?: any;
	headers: IncomingHttpHeaders;
	method: string;
	query: any;
}

const getGraphQLCode = (error: Error & { code?: number }) => {
	return error.code ?? error.name === 'NotFoundError' ? 404 : null;
};

const handler: NextApiHandler = async (req, res) => {
	// For POST requests, we require a custom header: X-CSRF-Trick.
	// This helps ensure that cross-domain requests can't be issued.
	if (req.method === 'POST' && req.headers['x-csrf-trick'] !== 'Intervie') {
		res.status(400);
		res.end('Invalid request');
	}

	const { session, ironSession } = await resolveSession(req, res);

	try {
		const request: GraphQLRequest = {
			headers: req.headers,
			method: req.method ?? 'GET',
			query: req.query,
			body: req.body
		};

		if (shouldRenderGraphiQL(request)) {
			res.setHeader('Content-Type', 'text/html');
			res.send(
				renderGraphiQL({
					endpoint: '/api/graphql',
					headers: JSON.stringify({
						'X-CSRF-Trick': 'Intervie'
					})
				})
			);
		} else {
			const { operationName, query, variables } = getGraphQLParameters(request);

			const result = await processRequest<Context>({
				operationName,
				query,
				variables,
				request,
				schema,
				contextFactory: () => createGraphQLContext(req, res, ironSession, session)
			});

			if (result.type !== 'RESPONSE') {
				throw new Error(`Unsupported response type: "${result.type}"`);
			}

			result.headers.forEach(({ name, value }) => res.setHeader(name, value));
			res.status(result.status);
			res.json(result.payload);
		}
	} catch (err) {
		res.status(500);
		res.end(String(err));
	}
};

export default handler;
