import * as Types from '../../../__generated__/schema.generated';

export type SignUpFormMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;


export type SignUpFormMutation = { __typename?: 'Mutation', signUp: { __typename: 'CodedError', code: string, message: string, validation: any } | { __typename: 'MutationSignUpSuccess', data: { __typename?: 'User', id: string } } | { __typename: 'ZodError', errors: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> } };
