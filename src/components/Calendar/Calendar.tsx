import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../../graphql/queries";
import { getMonth } from "./utils";
import CalendarHeader from "./CalendarHeader";
import Loading from "../Loading";
import ServerError from "../Error";
import CalendarBody from "./CalendarBody";

const Calendar = () => {
	const result = useQuery(ALL_SCREENINGS);
	const month = getMonth();

	useEffect(() => {
		document.title = "Calendar";
	});

	if (result.loading) return <Loading />;
	if (result.error) return <ServerError />;

	return (
		<div className="px-5 -mt-3 md:max-w-screen-2xl md:mx-auto">
			<h2 className="text-xl mb-3 font-bold py-3 bg-white sticky top-0 lg:text-3xl">
				{month}
			</h2>
			<table className="border border-gray-200 md:mx-auto lg:mx-0">
				<CalendarHeader />
				<CalendarBody screenings={result.data.allScreenings} />
			</table>
		</div>
	);
};

export default Calendar;
