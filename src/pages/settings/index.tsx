import { GetServerSideProps } from 'next';

import Settings from '~/components/Settings';
import { authenticatedRoute } from '~/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Settings;
