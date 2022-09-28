import { GetServerSideProps } from 'next';

import SubMenu from '~/components/SubMenu';
import Link from '~/components/ui/Link';
import { authenticatedRoute } from '~/utils/redirects';

const Settings = () => {
	return (
		<>
			<Link href="/">backs</Link>
			{/* <SubMenu /> */}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Settings;
