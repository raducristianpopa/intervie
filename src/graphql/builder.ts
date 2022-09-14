import { IncomingMessage, OutgoingMessage } from 'http';
import { IronSession } from 'iron-session';

import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaTypes from '@pothos/plugin-prisma/';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ValidationPlugin from '@pothos/plugin-validation';
import { Session } from '@prisma/client';
import { prisma } from '@utils/db';

export interface Context {
	req: IncomingMessage;
	res: OutgoingMessage;
	ironSession: IronSession;
	session?: Session | null;
}

export const createGraphQLContext = (
	req: IncomingMessage,
	res: OutgoingMessage,
	ironSession: IronSession,
	session: Session | null
): Context => {
	return {
		req,
		res,
		ironSession,
		session
	};
};

export const builder = new SchemaBuilder<{
	// We change the defaults for arguments to be `required`. Any non-required
	// argument can be set to `required: false`.
	DefaultInputFieldRequiredness: true;
	// We are passing our Prisma generated types
	PrismaTypes: typeof PrismaTypes;
	Context: Context;
	Scalars: {
		// We modify the types for the `ID` type to denote that it's always a string when it comes in.
		ID: { Input: string; Output: string | number };
		DateTime: { Input: Date; Output: Date };
	};
	AuthScopes: {
		public: boolean;
		user: boolean;
		unauthenticated: boolean;
	};
	// Define the shape of the auth scopes that we'll be using:
}>({
	defaultInputFieldRequiredness: true,
	plugins: [SimpleObjectsPlugin, ScopeAuthPlugin, ErrorsPlugin, ValidationPlugin, PrismaPlugin],
	authScopes: async ({ session }) => ({
		public: true,
		user: !!session,
		unauthenticated: !session
	}),
	prisma: { client: prisma }
});

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('DateTime', {
	serialize: (date) => date.toISOString(),
	parseValue: (date) => {
		if (typeof date !== 'string') {
			throw new Error('Unknown date value.');
		}

		return new Date(date);
	}
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({
	// Set the default auth scope to be authenticated users:
	authScopes: {
		user: true
	}
});

builder.mutationType({
	// Set the default auth scope to be authenticated users:
	authScopes: {
		user: true
	}
});
