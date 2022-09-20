import * as Types from '../../../__generated__/schema.generated';

export type ScopeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ScopeQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, email: string, name: string } | null };
