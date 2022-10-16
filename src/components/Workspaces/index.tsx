import { MagnifyingGlass } from 'phosphor-react';

import SubMenu, { SubMenuLinksProps } from '../SubMenu';
import DashboardContainer from '../ui/DashboardContainer';
import { Input } from '../ui/Input';
import DropdownCreateNew from './DropdownCreateNew';
import WorkspaceOverview from './WorkspaceOverview';

export const links: SubMenuLinksProps[] = [
	{ name: 'Workspaces', href: '/' },
	{ name: 'Settings', href: '/settings' }
];

const Workspaces = () => {
	return (
		<>
			<SubMenu links={links} />
			<DashboardContainer background="neutral">
				<div className="flex flex-col items-stretch justify-start space-y-6 pt-6 pb-12">
					<div className="flex flex-row items-stretch justify-start">
						<Input leftIcon={<MagnifyingGlass />} width="100%" />
						<DropdownCreateNew />
					</div>
					<div>
						<WorkspaceOverview />
					</div>
				</div>
			</DashboardContainer>
		</>
	);
};

export default Workspaces;
