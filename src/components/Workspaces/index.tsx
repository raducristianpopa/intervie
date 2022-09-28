import { gql, useQuery } from '@apollo/client';
import { MagnifyingGlass } from 'phosphor-react';

import SubMenu, { SubMenuLinksProps } from '../SubMenu';
import DashboardContainer from '../ui/DashboardContainer';
import { Input } from '../ui/Input';
import DropdownCreateNew from './DropdownCreateNew';
import { WorkspacesQuery } from './__generated__/index.generated';

export const query = gql`
	query WorkspacesQuery {
		workspaces {
			id
			name
			type
		}
	}
`;

const links: SubMenuLinksProps[] = [
	{ name: 'Workspaces', href: '/' },
	{ name: 'Settings', href: '/settings' }
];

const Workspaces = () => {
	const { data } = useQuery<WorkspacesQuery>(query);

	console.log(data);

	return (
		<>
			<SubMenu links={links} />
			<DashboardContainer>
				<div className="flex flex-col items-stretch justify-start pt-6 pb-12">
					<div className="flex flex-row items-stretch justify-start">
						<Input leftIcon={<MagnifyingGlass />} width="100%" />
						<DropdownCreateNew />
					</div>
				</div>
			</DashboardContainer>
		</>
	);
};

export default Workspaces;
