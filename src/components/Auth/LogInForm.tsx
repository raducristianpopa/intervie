import { useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Envelope } from 'phosphor-react';
import { object, string } from 'zod';

import { useAuthRedirect } from '~/hooks/useAuthRedirect';

import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Form, useZodForm } from '../ui/Form';
import { Input } from '../ui/Input';
import Link from '../ui/Link';
import { LogInFormMutation, LogInFormMutationVariables } from './__generated__/LogInForm.generated';

const logInSchema = object({
	email: string().email().min(1),
	password: string().min(1)
});

const LogInForm = () => {
	const authRedirect = useAuthRedirect();
	const [logIn, { data, error }] = useMutation<LogInFormMutation, LogInFormMutationVariables>(gql`
		mutation LogInFormMutation($input: LogInInput!) {
			logIn(input: $input) {
				__typename
				... on MutationLogInSuccess {
					data {
						id
					}
				}
				... on CodedError {
					code
					message
					validation
				}
				... on ZodError {
					errors {
						message
						path
					}
				}
			}
		}
	`);

	const form = useZodForm({
		schema: logInSchema
	});

	useEffect(() => {
		if (data?.logIn.__typename === 'MutationLogInSuccess') {
			authRedirect();
		}
	}, [data, authRedirect]);

	return (
		<>
			<div className="mb-4 max-w-md text-center">
				<h1 className="text-4xl font-bold leading-10 tracking-tighter">Log in to Intervie</h1>
			</div>
			<div className="w-full max-w-sm self-center">
				<Form
					form={form}
					onSubmit={({ email, password }) =>
						logIn({
							variables: {
								input: { email, password }
							}
						})
					}
				>
					<ErrorMessage title="Error logging in" error={error} />
					<Input
						label="Email"
						type="email"
						autoComplete="email"
						placeholder="(ex: johndoe@example.com)"
						autoCorrect="off"
						spellCheck="false"
						required
						{...form.register('email')}
					/>
					<Input
						label="Password"
						type="password"
						autoComplete="off"
						placeholder="Password"
						autoCorrect="off"
						spellCheck="false"
						required
						{...form.register('password')}
					/>

					<Button
						aria-label="sign up"
						variant="success"
						size="xl"
						type="submit"
						leftIcon={<Envelope size={24} />}
					>
						Continue with Email
					</Button>
				</Form>
				<div className="mt-3 text-center">
					<p>
						Don&apos;t have an account?{' '}
						<Link href="signup" className="text-blue-500 hover:underline">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default LogInForm;
