import { Briefcase, Buildings } from 'phosphor-react';

import { Workspace, WorkspaceTypes } from '~/__generated__/schema.generated';

import Link from '../ui/Link';

interface Props {
	workspace: Workspace;
}

const WorkspaceCard = ({ workspace }: Props) => {
	return (
		<div>
			<Link
				href="/"
				className="block h-full min-w-[300px] overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-150 hover:border-black dark:border-neutral-700 dark:bg-black dark:hover:border-white"
			>
				<div className="flex h-full flex-col items-stretch justify-start space-y-4 p-6">
					<div className="flex items-center justify-between">
						<div className="flex min-w-0 items-center justify-start">
							{workspace.type === WorkspaceTypes.Personal && <Briefcase size={32} />}
							{workspace.type === WorkspaceTypes.Organization && <Buildings size={32} />}
							<div className="ml-2 flex flex-col">
								<p className="leading-4">{workspace.name}</p>
								<p className="text-extralight leading-4 text-zinc-500">{workspace.type}</p>
							</div>
						</div>
					</div>
					<div>
						{workspace.openingsCount} opening
						{workspace.openingsCount === 0 || workspace.openingsCount > 1 ? 's' : ''}
					</div>
					<div>more general info here ....</div>
				</div>
			</Link>
		</div>
	);
};

export default WorkspaceCard;
