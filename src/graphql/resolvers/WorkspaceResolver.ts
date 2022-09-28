import { prisma } from '~/utils/db';

import { builder } from '../builder';

builder.prismaObject('Workspace', {
	findUnique: (workspace) => ({ pk: workspace.pk }),
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		type: t.exposeString('type')
	})
});

builder.queryField('workspaces', (t) =>
	t.prismaField({
		type: ['Workspace'],
		nullable: true,
		resolve: (query, _root, _args, { session }) => {
			return prisma.workspace.findMany({
				...query,
				where: {
					userPk: session!.userPk
				}
			});
		}
	})
);
