import { useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Envelope } from 'phosphor-react';
import { object, string } from 'zod';

import { Button } from '~/components/ui/Button';
import { ErrorMessage } from '~/components/ui/ErrorMessage';
import { Form, useZodForm } from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import Link from '~/components/ui/Link';
import { useAuthRedirect } from '~/hooks/useAuthRedirect';

const signUpSchema = object({
	name: string().min(5).max(100),
	email: string().email().min(1),
	password: string().min(8),
	confirmPassword: string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match.',
	path: ['confirmPassword']
});

const SignUpForm = () => {
	const authRedirect = useAuthRedirect();
	const [signUp, { data, error }] = useMutation(
		gql`
			mutation SignUpFormMutation($input: SignUpInput!) {
				signUp(input: $input) {
					__typename
					... on MutationSignUpSuccess {
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
		`
	);

	const form = useZodForm({
		schema: signUpSchema
	});

	useEffect(() => {
		if (data?.signUp.__typename === 'MutationSignUpSuccess') {
			authRedirect();
		}
	}, [data, authRedirect]);

	return (
		<>
			<div className="mb-4 max-w-md text-center">
				<h1 className="text-4xl font-bold leading-10 tracking-tighter">Join [...some message]</h1>
			</div>
			<div className="w-full max-w-sm self-center">
				<Form
					form={form}
					onSubmit={({ name, email, password, confirmPassword }) =>
						signUp({
							variables: {
								input: { name, email, password, confirmPassword }
							}
						})
					}
				>
					<ErrorMessage title="Error creating account" error={error} />
					<Input
						label="Name"
						type="text"
						placeholder="(ex: John Doe)"
						autoCorrect="off"
						spellCheck="false"
						required
						{...form.register('name')}
					/>
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
					<Input
						label="Confirm password"
						type="password"
						autoComplete="off"
						placeholder="Confirm password"
						autoCorrect="off"
						spellCheck="false"
						required
						{...form.register('confirmPassword')}
					/>
					<Button
						aria-label="sign up"
						variant="success"
						size="xl"
						type="submit"
						leftIcon={<Envelope size={24} />}
						fullWidth
					>
						Continue with Email
					</Button>
				</Form>
				<div className="mt-3 text-center">
					<p>
						Already have an account?{' '}
						<Link href="login" className="text-blue-500 hover:underline">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SignUpForm;
