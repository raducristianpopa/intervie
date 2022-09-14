import { addSeconds, differenceInSeconds } from 'date-fns';
import { IncomingMessage, ServerResponse } from 'http';
import { IronSession, IronSessionOptions, getIronSession } from 'iron-session';

import { Session, User } from '@prisma/client';

import { prisma } from './db';

declare module 'iron-session' {
	interface IronSessionData {
		sessionId?: string | null;
	}
}

interface CachedSession {
	session: Session | null;
	ironSession: IronSession;
}

// If there cookie secret is not set in the `.env` file show a warning
if (!process.env.COOKIE_SECRET) {
	console.warn('No `COOKIE_SECRET` enviroment variable was found.');
}

const SESSION_TTL = 15 * 24 * 3060;

const SESSION_OPTIONS: IronSessionOptions = {
	password: {
		1: process.env.COOKIE_SECRET as string
	},
	cookieName: 'intervie.session.1',
	ttl: SESSION_TTL,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		httpOnly: true
	}
};

export const createSession = async (ironSession: IronSession, user: User): Promise<Session> => {
	const session = await prisma.session.create({
		data: {
			userPk: user.pk,
			expiresAt: addSeconds(new Date(), SESSION_TTL)
		}
	});

	ironSession.sessionId = session.id;

	// When we save the session, the cookie header will be sent once the response is sent.
	await ironSession.save();

	return session;
};

export const deleteSession = async (ironSession: IronSession, session: Session): Promise<void> => {
	// This will empty the session object and sets the cookie header to be sent once the response is sent.
	// The browser will then remove the cookie automatically.
	// We do not have to save the session like above, it will automatically be saved.
	ironSession.destroy();

	if (session) {
		await prisma.session.update({
			where: {
				id: session.id
			},
			data: {
				isExpired: true
			}
		});
	}
};

/**
 * We will save active session in a WeakMap.
 * The difference between a `Map` and a `WeakMap` is that we can have objects
 * as keys. WeakMap keys are just references to another objects.
 */

const sessionCache = new WeakMap<IncomingMessage, CachedSession>();

export const resolveSession = async (
	req: IncomingMessage,
	res: ServerResponse
): Promise<CachedSession> => {
	const cachedSession = sessionCache.get(req);
	if (cachedSession) {
		return cachedSession;
	}

	const ironSession = await getIronSession(req, res, SESSION_OPTIONS);
	const sessionId = ironSession.sessionId;

	let session: Session | null = null;

	if (sessionId) {
		session = await prisma.session.findFirst({
			where: {
				id: sessionId,
				expiresAt: {
					gte: new Date()
				}
			}
		});

		if (session) {
			// If the session expired update the `isExpired` field.
			if (session.expiresAt >= new Date()) {
				await prisma.session.update({
					where: {
						id: session.id
					},
					data: {
						isExpired: true
					}
				});

				ironSession.destroy();
			} else {
				// If we resolve a session in the request, we will automatically renew it
				// if 50% of the session elapsed
				const shouldRefreshSession =
					differenceInSeconds(session.expiresAt, new Date()) < 0.5 * SESSION_TTL;

				if (shouldRefreshSession) {
					await prisma.session.update({
						where: {
							id: session.id
						},
						data: {
							expiresAt: addSeconds(new Date(), SESSION_TTL)
						}
					});

					await ironSession.save();
				}
			}
		} else {
			// There was no session found in the DB, but one was found in the session store.
			// This means that the browser is out-of-date with the server. In this case,
			// we just destroy the session entirely.
			ironSession.destroy();
		}
	}

	sessionCache.set(req, { session, ironSession });

	return {
		session,
		ironSession
	};
};
