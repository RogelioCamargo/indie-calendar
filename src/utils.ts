import * as dateFns from "date-fns";

export const getMonth = (): string => {
	return dateFns.format(new Date(), "MMMM");
};

export const getDayName = (day: Date, incrementor: number): string => {
	return dateFns.format(dateFns.addDays(day, incrementor), "iiii");
};

export const getDayOfTheMonth = (day: Date) => {
	return dateFns.format(day, "d");
}

export const isSameMonth = (day: Date, monthStart: Date): boolean => {
	return dateFns.isSameMonth(day, monthStart);
}

export const getClassesForDayContainer = (day: Date, monthStart: Date): string => {
	return !dateFns.isSameMonth(day, monthStart) ? "bg-gray-100" : 
					dateFns.isSameDay(day, new Date()) ? "pb-12 bg-red-500 text-white": "";
}