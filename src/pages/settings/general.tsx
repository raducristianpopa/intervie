import { GetServerSideProps } from 'next';

import Settings from '~/components/Settings';
import GeneralSettings from '~/components/Settings/GeneralSettings';
import { authenticatedRoute } from '~/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default function General() {
	return <Settings tab={<GeneralSettings />} />;
}
