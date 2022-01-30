import React from "react";
import { Screening } from "../../types";
import ScreeningPreview from "./ScreeningPreview";
import { getClassesForDayContainer, getDayOfTheMonth, isSameMonth } from "./utils";

const Day = ({ day, screenings, monthStart }: { day: Date, screenings: Array<Screening>, monthStart: Date }) => {
	const dayOfTheMonth = getDayOfTheMonth(day);
	return (
		<div className={`border border-gray-200 pt-2 px-5 pb-5 md:flex-1 ${getClassesForDayContainer(day, monthStart)}`}>
			<span className="block font-bold mb-3">{dayOfTheMonth}</span>
			{
				isSameMonth(day, monthStart) &&
				screenings.map(
					(screening: Screening) => (
						<ScreeningPreview screening={screening} day={day} key={screening.id} />
					))
			}
		</div>
	);
};

export default Day;