import { gql } from "@apollo/client";

const ALL_SCREENINGS = gql`
	query {
		allScreenings {
			id
			title
			time
			date {
				day
			}
		}
	}
`;

export { ALL_SCREENINGS };