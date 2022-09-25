import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import LogInForm from '~/components/Auth/LogInForm';
import AuthContainer from '~/components/ui/AuthContainer';
import { unauthenticatedRoute } from '~/utils/redirects';

import { NextPageWithLayout } from './_app';

const LogIn: NextPageWithLayout = () => {
	return <LogInForm />;
};

LogIn.getLayout = function (page: ReactElement) {
	return <AuthContainer>{page}</AuthContainer>;
};

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export default LogIn;
