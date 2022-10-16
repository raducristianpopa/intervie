import { ReactNode } from 'react';

import clsx from 'clsx';

import SubMenu from '../SubMenu';
import { links } from '../Workspaces';
import { Button } from '../ui/Button';
import Card from '../ui/Card';
import CardFooter from '../ui/Card/CardFooter';
import DashboardContainer from '../ui/DashboardContainer';
import PageHeader from '../ui/PageHeader';
import GeneralSettings from './GeneralSettings';
import SideMenu from './SideMenu';

interface Props {
	tab?: ReactNode;
}

const Settings = ({ tab }: Props) => {
	const tabIsSet = !!tab;
	console.log(tabIsSet);
	return (
		<>
			<SubMenu links={links} />
			<PageHeader title="Personal Account Settings" />
			<DashboardContainer background="black">
				<span className="mt-12 hidden md:block" /> {/*Spacer*/}
				<div
					className={clsx(
						'relative flex max-w-full items-stretch justify-start',
						tabIsSet && 'flex-col md:flex-row'
					)}
				>
					<SideMenu hasTab={tabIsSet} />
					<div
						className={clsx(
							tabIsSet ? 'flex' : 'hidden md:flex',
							'ml-0 mt-6 flex-1 flex-col items-stretch justify-start md:ml-4 md:mt-0'
						)}
					>
						<main>
							<section>
								{tabIsSet ? tab : <GeneralSettings />}
								{/* <Card title="Your name">
									<form>
										<div className="mb-12">test</div>
										<CardFooter status="status">
											<Button aria-label="Save name" variant="primary" size="lg">
												Save
											</Button>
										</CardFooter>
									</form>
								</Card> */}
							</section>
						</main>
					</div>
				</div>
			</DashboardContainer>
		</>
	);
};

export default Settings;
