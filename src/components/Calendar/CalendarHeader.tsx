import React from "react";
import { getDayName } from "./utils";

const DayName = ({ name }: { name: string }) => (
	<div className="border border-gray-200 md:flex-1 py-1 font-bold">
		{name}
	</div>
);

const CalendarHeader = ({ date }: { date: Date}) => {
	// get days of the week
	const weekdayNames = [];
	for (let i = 0; i < 7; i++) {
		weekdayNames.push(
			<DayName name={getDayName(date, i)} key={i}/>
		);
	}

	return (
		<div className="hidden w-full lg:flex">
			{weekdayNames}
		</div>
	);
};

export default CalendarHeader;