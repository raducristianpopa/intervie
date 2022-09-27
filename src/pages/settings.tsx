import { GetServerSideProps } from 'next';

import SubMenu from '~/components/SubMenu';
import { authenticatedRoute } from '~/utils/redirects';

const Settings = () => {
	return (
		<>
			<SubMenu />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Settings;
