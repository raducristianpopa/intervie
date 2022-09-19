import { object, string } from 'zod';

import { gql, useMutation } from '@apollo/client';
import { Button } from '@components/ui/Button';
import { ErrorMessage } from '@components/ui/ErrorMessage';
import { Form, useZodForm } from '@components/ui/Form';
import { Input } from '@components/ui/Input';
import Link from '@components/ui/Link';

const signUpSchema = object({
	email: string().email().min(1),
	password: string().min(8)
});
// .refine((data) => data.password === data.confirmPassword, {
// 	message: 'Passwords do not match',
// 	path: ['confirmPassword']
// });

const SignUpForm = () => {
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

	return (
		<div className="flex items-center p-4 mx-auto w-[28rem]">
			<Form
				form={form}
				onSubmit={({ email, password }) =>
					signUp({
						variables: {
							input: { email, password }
						}
					})
				}
				className="w-full p-6 rounded-md bg-neutral-900 mt-1.5"
			>
				<div className="flex flex-col items-center mb-2">
					<h2 className="text-4xl font-bold text-center">Sign up</h2>
					<Link href="/auth/login" className="font-medium hover:underline">
						Already have an account? Sign in!
					</Link>
				</div>
				<ErrorMessage title="Error creating account" error={error} />
				<Input label="Email" type="email" autoComplete="email" {...form.register('email')} />
				<Input
					label="Password"
					type="password"
					autoComplete="password"
					{...form.register('password')}
				/>
				<Button aria-label="sign up" type="submit">
					Sign Up
				</Button>
			</Form>
		</div>
	);
};

export default SignUpForm;
