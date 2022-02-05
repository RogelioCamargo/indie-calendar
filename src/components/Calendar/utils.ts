import * as dateFns from "date-fns";
import { Screening } from "../../types";

export const getMonth = (): string => {
	return dateFns.format(new Date(), "MMMM");
};

export const getNextDay = (day: Date): Date => {
	return dateFns.addDays(day, 1);
};

export const getDayOfTheMonth = (day: Date) => {
	return dateFns.format(day, "d");
};

export const isSameMonth = (day: Date, monthStart: Date): boolean => {
	return dateFns.isSameMonth(day, monthStart);
};

export const getClassesForDayContainer = (
	day: Date,
	monthStart: Date
): string => {
	return !dateFns.isSameMonth(day, monthStart)
		? "bg-gray-100"
		: dateFns.isSameDay(day, new Date())
		? "pb-12 bg-red-500 text-white"
		: "";
};

export const getClassesForScreeningPreview = (day: Date): string => {
	return dateFns.isSameDay(day, new Date())
		? "hover:text-black"
		: "hover:text-red-500";
};

export const formatDate = (day: string) => {
	const newDate = new Date();
	return (
		dateFns.format(newDate, "MMMM") +
		" " +
		day +
		", " +
		dateFns.format(newDate, "yyyy")
	);
};

export const sortScreeningsByTime = (
	screenings: Array<Screening>
) => {
	const morningScreenings = screenings.filter(
		(screening: Screening) =>
			screening.time.toUpperCase().includes("AM")
	);
	const eveningScreenings = screenings.filter(
		(screening: Screening) =>
			screening.time.toUpperCase().includes("PM")
	);
	eveningScreenings.sort(
		(a: Screening, b: Screening) =>
			Number(a.time.replace(/[^0-9]/g, "")) -
			Number(b.time.replace(/[^0-9]/g, ""))
	);

	return [...morningScreenings, ...eveningScreenings];
};
