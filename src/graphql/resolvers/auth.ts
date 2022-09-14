import { builder } from '@graphql/builder';
import { authenticate } from '@utils/auth';
import { prisma } from '@utils/db';
import { createSession, deleteSession } from '@utils/sessions';

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
			return prisma.user.findUnique({
				...query,
				where: { pk: session.userPk },
				rejectOnNotFound: true
			});
		}
	})
);
