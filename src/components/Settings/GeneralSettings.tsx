import { MouseEventHandler, useEffect } from 'react';

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { object, string } from 'zod';

import { useAuthRedirect } from '~/hooks/useAuthRedirect';
import { useApollo } from '~/utils/apollo';

import { Button } from '../ui/Button';
import Card from '../ui/Card';
import CardFooter from '../ui/Card/CardFooter';
import { Form, useZodForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Shimmer } from '../ui/Shimmer';
import {
	ReadUser_User,
	UpdateNameMutation,
	UpdateNameMutationVariables,
	UserQuery
} from './__generated__/GeneralSettings.generated';

const nameSchema = object({
	name: string().min(5).max(100)
});

export const query = gql`
	query UserQuery {
		viewer {
			name
		}
	}
`;

interface ClickHandlerProps
	extends MouseEventHandler<HTMLButtonElement>,
		MouseEventHandler<HTMLAnchorElement> {}

const GeneralSettings = () => {
	const client = useApollo();
	const authRedirect = useAuthRedirect();

	const [deletePersonalAccount] = useMutation(
		gql`
			mutation GeneralSettingsDeletePersonalAccountMutation {
				deletePersonalAccount
			}
		`,
		{
			onCompleted() {
				authRedirect();
			}
		}
	);
	const [getName, { data: lazyData, loading }] = useLazyQuery<UserQuery>(query);
	const user = client.readFragment<ReadUser_User>({
		id: 'User:current',
		fragment: gql`
			fragment ReadUser_user on User {
				name
			}
		`
	});

	let name = user?.name;

	// If the user does not exists in cache we have to query it.
	useEffect(() => {
		if (!user) {
			getName().then((res) => {
				name = res.data?.viewer?.name;
				form.reset({ name });
			});
		}
	}, [name]);

	const form = useZodForm({
		schema: nameSchema,
		defaultValues: {
			name: name
		}
	});

	const [updateName, { data }] = useMutation<UpdateNameMutation, UpdateNameMutationVariables>(gql`
		mutation UpdateNameMutation($input: UpdateNameInput!) {
			updateName(input: $input) {
				__typename
				... on MutationUpdateNameSuccess {
					data {
						name
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

	useEffect(() => {
		if (data?.updateName.__typename === 'MutationUpdateNameSuccess') {
			toast.success('Your name was successfully updated.');
		}
	}, [data]);

	const showDialog: ClickHandlerProps = () => {
		toast(
			(t) => (
				<div className="flex items-center justify-between space-x-10">
					<Button aria-label="Dismiss" variant="primary" onClick={() => toast.dismiss(t.id)}>
						Dismiss
					</Button>
					<Button aria-label="Dismiss" variant="danger" onClick={() => deletePersonalAccount()}>
						Delete personal account
					</Button>
				</div>
			),
			{
				duration: 10000
			}
		);
	};

	if (loading || !user?.name) {
		return <Shimmer />;
	}

	return (
		<section className="flex flex-col space-y-8">
			<Card title="Your name">
				<Form
					form={form}
					onSubmit={({ name }) =>
						updateName({
							variables: {
								input: { name }
							}
						})
					}
					small={true}
				>
					<div className="mb-12 mt-4">
						<p className="mb-4 font-light">This is your name that is shown on Intervie.</p>
						<Input
							type="text"
							placeholder="(ex: John Doe)"
							autoCorrect="off"
							spellCheck="false"
							required
							{...form.register('name')}
						/>
					</div>
					<CardFooter>
						<Button type="submit" aria-label="Save name" variant="primary" size="sm">
							Save
						</Button>
					</CardFooter>
				</Form>
			</Card>

			<Card title="Delete Account" variant="danger">
				<div className="mb-12 mt-4">
					<p className="mb-4 font-light">
						Permanently remove your Personal Account and all of its contents from the Intervie
						platform. This action is not reversible, so please continue with caution.
					</p>
				</div>
				<CardFooter>
					<Button
						type="button"
						aria-label="Delete account"
						variant="danger"
						size="sm"
						onClick={showDialog}
					>
						Delete Personal Account
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default GeneralSettings;
