import { ZodError } from 'zod';

import { prisma } from '~/utils/db';
import regex from '~/utils/regex';
import { deleteSession } from '~/utils/sessions';

import { builder } from '../builder';
import { CodedError } from '../errors';
import { Result } from './ResultResolver';

builder.prismaObject('User', {
	findUnique: (user) => ({ pk: user.pk }),
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		email: t.exposeString('email')
	})
});

const UpdateNameInput = builder.inputType('UpdateNameInput', {
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
		})
	})
});

builder.mutationField('updateName', (t) =>
	t.prismaField({
		type: 'User',
		skipTypeScopes: true,
		errors: {
			types: [ZodError, CodedError]
		},
		args: {
			input: t.arg({
				type: UpdateNameInput
			})
		},
		resolve: async (query, _root, { input }, { session }) => {
			return prisma.user.update({
				...query,
				where: {
					pk: session?.userPk
				},
				data: {
					name: input.name
				}
			});
		}
	})
);

builder.mutationField('deletePersonalAccount', (t) =>
	t.field({
		type: Result,
		resolve: async (_root, _args, { ironSession, session }) => {
			await deleteSession(ironSession, session);

			await prisma.user.delete({
				where: {
					pk: session?.userPk
				}
			});

			return Result.SUCCESS;
		}
	})
);
