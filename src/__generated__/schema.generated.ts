export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  ErrorExtension: any;
};

export type CodedError = CodedErrorInterface & {
  __typename?: 'CodedError';
  code: Scalars['String'];
  message: Scalars['String'];
  validation: Scalars['ErrorExtension'];
};

export type CodedErrorInterface = {
  code: Scalars['String'];
  message: Scalars['String'];
  validation: Scalars['ErrorExtension'];
};

export type Error = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: MutationSignUpResult;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignUpResult = CodedError | MutationSignUpSuccess | ZodError;

export type MutationSignUpSuccess = {
  __typename?: 'MutationSignUpSuccess';
  data: User;
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<User>;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ZodError = Error & {
  __typename?: 'ZodError';
  errors: Array<ZodFieldError>;
  message: Scalars['String'];
};

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message: Scalars['String'];
  path: Array<Scalars['String']>;
};
