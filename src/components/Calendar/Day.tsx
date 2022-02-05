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
	startOfMonth,
}: {
	day: Date;
	screenings: Array<Screening>;
	startOfMonth: Date;
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

	const NotDayOfMonth = () => (
		<span className="block font-bold mb-3">{dayOfTheMonth}</span>
	);

	return (
		<td
			className={`border border-gray-200 pt-2 px-3 pb-5 md:flex-1 ${getClassesForDayContainer(
				day,
				startOfMonth
			)}`}
		>
			{isSameMonth(day, startOfMonth) ? <ScreeningList /> : <NotDayOfMonth />}
		</td>
	);
};

export default Day;
