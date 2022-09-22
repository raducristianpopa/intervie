import { GetServerSideProps } from 'next';

import { authenticatedRoute } from '~/utils/redirects';

const Index = () => {
	return <>DASHBOARD</>;
};

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Index;
