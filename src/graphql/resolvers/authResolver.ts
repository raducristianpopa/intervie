import { ZodError, z } from 'zod';

import { builder } from '~/graphql/builder';
import { CodedError } from '~/graphql/errors';
import { authenticate, hashPassword, verifyEmail } from '~/utils/auth';
import { prisma } from '~/utils/db';
import regex from '~/utils/regex';
import { createSession, deleteSession } from '~/utils/sessions';

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

// TODO(bear): Figure out how to verify if `password` = `confirmPassword`
const SignUpInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		name: t.string({
			validate: {
				minLength: [5, { message: 'Use 5 characters or more for your name.' }],
				maxLength: [100, { message: 'Use 100 characters or fewer for your name.' }],
				regex: [
					regex.ONLY_ALPHA_SPACES,
					{ message: 'Please only use only [A-Z], [a-z] characters and whitespaces.' }
				]
			}
		}),
		email: t.string({
			validate: { email: [true, { message: 'Email is not valid.' }] }
		}),
		password: t.string({
			validate: {
				minLength: [8, { message: 'Use 8 characters or more for your password.' }],
				maxLength: [255, { message: 'Use 100 characters or fewer for your password.' }],
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
				minLength: [8, { message: 'Use 8 characters or more for your password.' }],
				maxLength: [255, { message: 'Use 100 characters or fewer for your password.' }]
			}
		})
	})
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
		resolve: async (_query, _root, { input }, { ironSession }) => {
			// We verify if the email already exists.
			await verifyEmail(input.email);

			// We verify if the passwords are the same.
			// await checkPasswords(input.password, input.confirmPassword)

			const user = await prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					password: await hashPassword(input.password)
				}
			});

			await createSession(ironSession, user);

			return user;
		}
	})
);
