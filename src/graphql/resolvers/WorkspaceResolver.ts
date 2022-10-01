import { WorkspaceTypes } from '@prisma/client';

import { prisma } from '~/utils/db';

import { builder } from '../builder';

builder.enumType(WorkspaceTypes, { name: 'WorkspaceTypes' });

builder.prismaObject('Workspace', {
	findUnique: (workspace) => ({ pk: workspace.pk }),
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		type: t.field({
			type: WorkspaceTypes,
			resolve: (parent) => parent.type
		}),
		openingsCount: t.relationCount('openings')
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
				},
				orderBy: {
					type: 'asc'
				}
			});
		}
	})
);
