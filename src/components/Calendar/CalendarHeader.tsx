import React from "react";

const CalendarHeader = () => {
	const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return (
		<div className="hidden w-full lg:flex">
			{daysOfTheWeek.map(
				(dayOfTheWeek: string, index: number) => (
				<div className="border border-gray-200 md:flex-1 py-1 font-bold" key={index}>
					{dayOfTheWeek}
				</div>
			))}
		</div>
	);
};

export default CalendarHeader;