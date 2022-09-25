import { GetServerSideProps } from 'next';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { authenticatedRoute } from '~/utils/redirects';

const Index = () => {
	return (
		<>
			Dashboard
			<Button aria-label="s" variant="secondary">
				fdafdaf
			</Button>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Index;
