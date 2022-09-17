// TODO(bear): Make sure Postmark works fine. If not, find another Email service.
import { Client } from 'postmark';

const POSTMARK_FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || '';
const POSTMARK_SERVER_API_TOKEN = process.env.POSTMARK_SERVER_API_TOKEN || '';

if (!POSTMARK_SERVER_API_TOKEN) {
	console.warn('You have not configured a `POSTMARK_SERVER_API_TOKEN` environment variable.');
	console.warn('Sending emails will be disabled, and they will only be printed to the console.');
}

interface Email {
	to: string;
	subject: string;
	textBody: string;
}

const client = new Client(POSTMARK_SERVER_API_TOKEN || 'NO_API_TOKEN');

export const sendEmail = async (email: Email) => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(`Sending email to: "${email.to}"`);
		console.log(`Subject: ${email.subject}`);
		console.log(`Body: ${email.textBody}`);
	}

	if (!POSTMARK_SERVER_API_TOKEN) {
		return;
	}

	await client.sendEmail({
		From: POSTMARK_FROM_EMAIL,
		To: email.to,
		Subject: email.subject,
		TextBody: email.textBody

		/**
		 * TODO(bear): Try out `mjml` to create a more visually appealing email (https://mjml.io/)
		 * ! Postmark has a HtmlBody property that can be used to render HTML elements.
		 */
	});
};
