import React from "react";
import { Screening } from "../../types";
import ScreeningPreview from "./ScreeningPreview";
import { Link } from "react-router-dom";
import { getClassesForDayContainer, getDayOfTheMonth, isSameMonth } from "./utils";

const Day = ({ day, screenings, monthStart }: { day: Date, screenings: Array<Screening>, monthStart: Date }) => {
	const dayOfTheMonth = getDayOfTheMonth(day);
	return (
		<div className={`border border-gray-200 pt-2 px-5 pb-5 md:flex-1 ${getClassesForDayContainer(day, monthStart)}`}>
			{
				isSameMonth(day, monthStart) ?
				<Link to={`/${dayOfTheMonth}`}>
					<span className="block font-bold mb-3">{dayOfTheMonth}</span>
					{
						screenings.map(
							(screening: Screening) => (
								<ScreeningPreview screening={screening} day={day} key={screening.id} />
							))
					}
				</Link> :
				<span className="block font-bold mb-3">{dayOfTheMonth}</span>
			}
		</div>
	);
};

export default Day;