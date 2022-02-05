import React from "react";
import { Screening } from "../../types";
import ScreeningPreview from "./ScreeningPreview";
import { Link } from "react-router-dom";
import {
	getClassesForDayContainer,
	getDayOfTheMonth,
	isSameMonth,
} from "./utils";

const Day = ({
	day,
	screenings,
	monthStart,
}: {
	day: Date;
	screenings: Array<Screening>;
	monthStart: Date;
}) => {
	const dayOfTheMonth = getDayOfTheMonth(day);

	const ScreeningList = () => (
		<>
			<Link to={`/showtimes/${dayOfTheMonth}`}>
				<span className="block font-bold mb-3">{dayOfTheMonth}</span>
			</Link>
			<ul>
				{screenings.map((screening: Screening) => (
					<ScreeningPreview
						screening={screening}
						day={day}
						key={screening.id}
					/>
				))}
			</ul>
		</>
	);

	return (
		<td
			className={`border border-gray-200 pt-2 px-3 pb-5 md:flex-1 ${getClassesForDayContainer(
				day,
				monthStart
			)}`}
		>
			{isSameMonth(day, monthStart) ? (
				<ScreeningList />
			) : (
				<span className="block font-bold mb-3">{dayOfTheMonth}</span>
			)}
		</td>
	);
};

export default Day;
