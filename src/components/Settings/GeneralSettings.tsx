import { Button } from '../ui/Button';
import Card from '../ui/Card';
import CardFooter from '../ui/Card/CardFooter';

const GeneralSettings = () => {
	return (
		<Card title="Your name">
			<form>
				<div className="mb-12">test</div>
				<CardFooter status="status">
					<Button aria-label="Save name" variant="primary" size="lg">
						Save
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};

export default GeneralSettings;
