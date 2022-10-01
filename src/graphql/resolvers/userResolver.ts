import { builder } from '../builder';

builder.prismaObject('User', {
	findUnique: (user) => ({ pk: user.pk }),
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		email: t.exposeString('email')
	})
});
