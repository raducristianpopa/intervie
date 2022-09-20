import { ZodError } from 'zod';

import { builder } from '~/graphql/builder';
import { CodedError } from '~/graphql/errors';
import { authenticate, hashPassword, verifyEmail } from '~/utils/auth';
import { prisma } from '~/utils/db';
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

const SignUpInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		name: t.string({
			validate: {
				minLength: [8, { message: 'Use 5 characters or more for your name.' }],
				maxLength: [255, { message: 'Use 100 characters or fewer for your name.' }]
			}
		}),
		email: t.string({
			validate: { email: [true, { message: 'Email is not valid.' }] }
		}),
		password: t.string({
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
			await verifyEmail(input.email);

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
