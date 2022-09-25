import { User } from '@prisma/client';
import crypto from 'crypto';
import { bcrypt, bcryptVerify } from 'hash-wasm';

import { CodedError } from '~/graphql/errors';

import { prisma } from './db';

// Cost factor of the bcrypt hash.
const COST_FACTOR = 12;

export const hashPassword = async (password: string): Promise<string> => {
	const salt = crypto.randomBytes(16);

	const key = await bcrypt({
		password,
		salt,
		costFactor: COST_FACTOR,
		outputType: 'encoded'
	});

	return key;
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
	return bcryptVerify({ password, hash });
};

export const authenticate = async (email: string, password: string): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive'
			}
		}
	});

	// If the email does not exists in the database, reject the authenticate request.
	if (!user || !user.password) {
		throw new CodedError('Invalid email or password.');
	}

	// If the password is invalid, reject the authenticate request.
	if (!(await verifyPassword(user.password, password))) {
		throw new CodedError('Invalid email or password.');
	}

	// Hash should be in the following form:
	// $2b$costFactor$hash
	const [, _algo, costFactorString] = user.password.split('$');

	// This should never practically happen, but in the event that is does we want to error out.
	if (!costFactorString) {
		throw new CodedError('Unknown hash format.');
	}

	// In case the cost factor is updated and the password was hashed with an old cost factor
	// we will upgrade it tot the updated cost.
	const costFactor = parseInt(costFactorString);
	if (costFactor !== COST_FACTOR) {
		const improvedHash = await hashPassword(password);
		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: improvedHash
			}
		});
	}

	// In case there are password reset requests and the user successfully logs in
	// we will invalidate all password reset request from the database
	await prisma.passwordReset.updateMany({
		where: {
			userPk: user.pk
		},
		data: {
			isExpired: true
		}
	});

	return user;
};

export async function verifyEmail(email: string): Promise<void> {
	const emailExists = !!(await prisma.user.count({
		where: {
			email: {
				equals: email,
				mode: 'insensitive'
			}
		}
	}));

	if (emailExists) {
		throw new CodedError('We are sorry for this.\n The email you provided already exists.');
	}
}
