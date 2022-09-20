import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import SignUpForm from '@components/Auth/SignUpForm';
import AuthContainer from '@components/ui/AuthContainer';
import { unauthenticatedRoute } from '@utils/redirects';

import { NextPageWithLayout } from './_app';

const SignUp: NextPageWithLayout = () => {
	return <SignUpForm />;
};

SignUp.getLayout = function (page: ReactElement) {
	return <AuthContainer>{page}</AuthContainer>;
};

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export default SignUp;
