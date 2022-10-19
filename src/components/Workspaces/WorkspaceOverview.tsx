import { gql, useQuery } from '@apollo/client';

import WorkspaceCard from './WorkspaceCard';
import { WorkspacesQuery } from './__generated__/WorkspaceOverview.generated';

export const query = gql`
	query WorkspacesQuery {
		workspaces {
			id
			name
			type
			openingsCount
		}
	}
`;

const WorkspaceOverview = () => {
	const { data, loading } = useQuery<WorkspacesQuery>(query);
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{loading && <>Loading workspaces...</>}
			{data?.workspaces?.map((workspace) => (
				<WorkspaceCard key={workspace.id} workspace={workspace} />
			))}
		</div>
	);
};

export default WorkspaceOverview;
