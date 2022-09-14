import { gql, useMutation, useQuery } from '@apollo/client';

import { HomeQuery } from './__generated__/index.generated';

export const query = gql`
	query HomeQuery {
		viewer {
			id
			name
		}
	}
`;

export const Test = () => {
	const { data, loading, error } = useQuery<HomeQuery>(query);

	return <div className="text-red-600">Homepage</div>;
};

export default Test;
