import { builder } from '../builder';

builder.prismaObject('User', {
	findUnique: (user) => ({ pk: user.pk }),
	fields: (t) => ({
		id: t.exposeString('id', {}),
		email: t.exposeString('email', {}),
		displayName: t.string({
			resolve: (parent) => parent.name || parent.email
		})
	})
});
