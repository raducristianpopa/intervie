import { GetServerSideProps } from 'next';

import Link from '~/components/ui/Link';
import { authenticatedRoute } from '~/utils/redirects';

const Settings = () => {
	return (
		<>
			<Link href="/">backs</Link>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Settings;
