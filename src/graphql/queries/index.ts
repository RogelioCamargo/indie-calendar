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

const FIND_SCREENINGS_BY_DAY = gql`
	query findScreeningsByDate($day: Int!) {
		findScreeningsByDate(day: $day) {
			id
			title
			director
			time
			links {
				trailer
				info
			}
			poster
			description
			date {
				day
			}
			location
			isDoubleFeature
		}
	}
`;

export { ALL_SCREENINGS, FIND_SCREENINGS_BY_DAY };