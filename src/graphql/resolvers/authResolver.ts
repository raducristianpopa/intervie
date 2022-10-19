import { ZodError, z } from 'zod';

import { builder } from '~/graphql/builder';
import { CodedError } from '~/graphql/errors';
import { authenticate, hashPassword, verifyEmail } from '~/utils/auth';
import { prisma } from '~/utils/db';
import regex from '~/utils/regex';
import { createSession, deleteSession } from '~/utils/sessions';

import { Result } from './ResultResolver';

builder.queryField('viewer', (t) =>
	t.prismaField({
		type: 'User',
		nullable: true,
		// The "me" field can be queried even if the user is not logged in
		skipTypeScopes: true,
		resolve: (query, _root, _args, { session }) => {
			if (!session?.userPk) {
				return null;
			}
			return prisma.user.findUniqueOrThrow({
				...query,
				where: { pk: session.userPk }
			});
		}
	})
);

const SignUpInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		name: t.string({
			validate: {
				minLength: [
					5,
					{ message: 'Use 5 characters or more for your name.' }
				],
				maxLength: [
					100,
					{ message: 'Use 100 characters or fewer for your name.' }
				],
				regex: [
					regex.ONLY_ALPHA_SPACES,
					{
						message:
							'Please only use only [A-Z], [a-z] characters and whitespaces.'
					}
				]
			}
		}),
		email: t.string({
			validate: {
				email: [true, { message: 'Email is not valid.' }],
				regex: [
					regex.EMAIL,
					{
						message: 'Sorry, we are unable to validate that email.'
					}
				]
			}
		}),
		password: t.string({
			validate: {
				minLength: [
					8,
					{ message: 'Use 8 characters or more for your password.' }
				],
				maxLength: [
					255,
					{
						message:
							'Use 100 characters or fewer for your password.'
					}
				],
				schema: z
					.string()
					.regex(regex.MIN_ONE_UPPERCASE, {
						message:
							'Passwords must contain: uppercase letter, lowercase letter, number and a special character.'
					})
					.regex(regex.MIN_ONE_LOWERCASE, {
						message:
							'Passwords must contain: uppercase letter, lowercase letter, number and a special character.'
					})
					.regex(regex.MIN_ONE_NUMERIC, {
						message:
							'Passwords must contain: uppercase letter, lowercase letter, number and a special character.'
					})
					.regex(regex.MIN_ONE_SPECIAL, {
						message:
							'Passwords must contain: uppercase letter, lowercase letter, number and a special character.'
					})
			}
		}),
		confirmPassword: t.string({
			validate: {
				minLength: [
					8,
					{ message: 'Use 8 characters or more for your password.' }
				],
				maxLength: [
					255,
					{
						message:
							'Use 100 characters or fewer for your password.'
					}
				]
			}
		})
	}),
	validate: [
		({ password, confirmPassword }) => password === confirmPassword,
		{ message: 'Passwords do not match.', path: ['password'] }
	]
});

builder.mutationField('signUp', (t) =>
	t.prismaField({
		type: 'User',
		// The parent auth scope (for the Mutation type) is for authenticated users,
		// so we will need to skip it.
		skipTypeScopes: true,
		errors: {
			types: [ZodError, CodedError]
		},
		authScopes: {
			unauthenticated: true
		},
		args: {
			input: t.arg({
				type: SignUpInput
			})
		},
		resolve: async (_query, _root, { input }, { req, ironSession }) => {
			// We verify if the email already exists.
			await verifyEmail(input.email);

			const userAgent = encodeURIComponent(
				req.headers['user-agent'] || ''
			);
			const userIp = req.socket.remoteAddress || null;

			const user = await prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					password: await hashPassword(input.password),
					registerIp: userIp,
					userAgent: userAgent
				}
			});

			await createSession(ironSession, user, req);

			return user;
		}
	})
);

const LogInInput = builder.inputType('LogInInput', {
	fields: (t) => ({
		email: t.string({
			validate: {
				email: [true, { message: 'Email is not valid.' }],
				regex: [
					regex.EMAIL,
					{
						message: 'Sorry, we are unable to validate that email.'
					}
				]
			}
		}),
		password: t.string({ validate: { minLength: 8 } })
	})
});

builder.mutationField('logIn', (t) =>
	t.prismaField({
		type: 'User',
		skipTypeScopes: true,
		authScopes: {
			unauthenticated: true
		},
		errors: {
			types: [ZodError, CodedError]
		},
		args: {
			input: t.arg({ type: LogInInput })
		},
		resolve: async (_query, _root, { input }, { req, ironSession }) => {
			const user = await authenticate(input.email, input.password);

			await createSession(ironSession, user, req);

			return user;
		}
	})
);

builder.mutationField('logOut', (t) =>
	t.field({
		type: Result,
		resolve: async (_root, _args, { ironSession, session }) => {
			await deleteSession(ironSession, session);
			return Result.SUCCESS;
		}
	})
);
