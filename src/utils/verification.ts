import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { prisma } from './db';
import { sendEmail } from './email';

export const ENABLE_EMAIL_VERIFICATION = process.env.ENABLE_EMAIL_VERIFICATION === 'true';
const APP_NAME = process.env.APP_NAME || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

// If deployed to Vercel, an enviroment variable will be set for us to access
// the application.
export const PUBLIC_URL = process.env.PUBLIC_URL || process.env.VERCEL_URL || '';

if (!JWT_SECRET) {
	console.warn('No `JWT_SECRET` environment variable was set. This can cause production errors.');
}

if (!PUBLIC_URL) {
	console.warn('No `PUBLIC_URL` environment variable was set. This can cause production errors.');
}

if (!APP_NAME) {
	console.warn(
		'No `APP_NAME` enviroment variable was set. This variable can be used across all application.'
	);
}

interface VerificationPayload {
	id: string;
	email: string;
}

export const generateToken = (user: User) => {
	const payload: VerificationPayload = {
		id: user.id,
		email: user.email
	};

	// This will return a Base64-encoded token that can be used in a URL.
	return Buffer.from(
		jwt.sign(
			payload,
			JWT_SECRET,
			// We will provide 1 day for the user to reset the password
			{ expiresIn: '1 day' }
		)
	).toString('base64url');
};
