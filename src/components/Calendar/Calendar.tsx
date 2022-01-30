import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../../graphql/queries";
import { Screening } from "../../types";
import { getClassesForDayContainer, getDayOfTheMonth, getMonth, getNextDay, isSameMonth } from "./utils";
import Week from "./Week";
import CalendarHeader from "./CalendarHeader";
import ScreeningPreview from "./ScreeningPreview";

const Calendar = () => {
	const [date] = useState(new Date());
	const result = useQuery(ALL_SCREENINGS);

	if (result.loading)
    return <div>Loading...</div>

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);

	const rows = [];

	let days = [];
	let day = startDate;
	const month = getMonth();

	const Day = ({ day }: { day: Date }) => {
		const dayOfTheMonth = getDayOfTheMonth(day);
		return (
			<div className={`border border-gray-200 pt-2 px-5 pb-5 md:flex-1 ${getClassesForDayContainer(day, monthStart)}`}>
				<span className="block font-bold mb-3">{dayOfTheMonth}</span>
				{
					isSameMonth(day, monthStart) &&
					result.data.allScreenings
						.filter((screening: Screening) => screening.date.day === Number(dayOfTheMonth))
						.map((screening: Screening) => (
							<ScreeningPreview screening={screening} day={day} key={screening.id} />
						))
				}
			</div>
		);
	};

	rows.push(<CalendarHeader date={startDate} key={"CalendarHeader"} />);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			days.push(
				<Day day={day} key={day.toDateString()} />
			);
			day = getNextDay(day);
		}
		rows.push(
			<Week key={day.toDateString()}>
				{days}
			</Week>
		);
		days = [];
	}

	return (
		<div className="m-5">
			<h2 className="text-2xl lg:text-3xl font-bold mb-5">
				{month}
			</h2>
			<div className="border border-gray-200">
				{rows}
			</div>
		</div>
	);
};

export default Calendar;