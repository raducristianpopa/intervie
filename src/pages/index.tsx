import { GetServerSideProps } from 'next';

import Workspaces from '~/components/Workspaces';
import { authenticatedRoute } from '~/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Workspaces;
