import { IncomingMessage, OutgoingMessage } from 'http';
import { IronSession } from 'iron-session';
import { ZodError, ZodFormattedError } from 'zod';

import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ValidationPlugin from '@pothos/plugin-validation';
import { Session } from '@prisma/client';

import { prisma } from '~/utils/db';

import { CodedError } from './errors';

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
	PrismaTypes: PrismaTypes;
	Context: Context;
	Scalars: {
		// We modify the types for the `ID` type to denote that it's always a string when it comes in.
		ID: { Input: string; Output: string | number };
		DateTime: { Input: Date; Output: Date };
		ErrorExtension: {
			Input: Record<string, string> | {};
			Output: Record<string, string> | {};
		};
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

builder.scalarType('ErrorExtension', {
	serialize: (extensions) => extensions
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

function flattenErrors(
	error: ZodFormattedError<unknown>,
	path: string[]
): { path: string[]; message: string }[] {
	const errors = error._errors.map((message) => ({
		path,
		message
	}));

	Object.keys(error).forEach((key) => {
		if (key !== '_errors') {
			errors.push(
				...flattenErrors((error as Record<string, unknown>)[key] as ZodFormattedError<unknown>, [
					...path,
					key
				])
			);
		}
	});

	return errors;
}

const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
	fields: (t) => ({
		message: t.exposeString('message')
	})
});

const CodedErrorInterface = builder.interfaceRef<CodedError>('CodedErrorInterface').implement({
	fields: (t) => ({
		code: t.exposeString('code'),
		message: t.exposeString('message'),
		validation: t.expose('validation', { type: 'ErrorExtension' })
	})
});

builder.objectType(CodedError, {
	name: 'CodedError',
	interfaces: [CodedErrorInterface],
	fields: (t) => ({
		code: t.exposeString('code'),
		message: t.exposeString('message'),
		validation: t.expose('validation', { type: 'ErrorExtension' })
	})
});

// A type for the individual validation issues
const ZodFieldError = builder
	.objectRef<{
		message: string;
		path: string[];
	}>('ZodFieldError')
	.implement({
		fields: (t) => ({
			message: t.exposeString('message'),
			path: t.exposeStringList('path')
		})
	});

// The actual error type
builder.objectType(ZodError, {
	name: 'ZodError',
	interfaces: [ErrorInterface],
	fields: (t) => ({
		errors: t.field({
			type: [ZodFieldError],
			resolve: (err) => flattenErrors(err.format(), [])
		})
	})
});
