import { ScreeningFull } from "../../types";

export const sortScreeningsByTime = (
	screenings: Array<ScreeningFull>
) => {
	const morningScreenings = screenings.filter(
		(screening: ScreeningFull) =>
			screening.time.toUpperCase().includes("AM")
	);
	const eveningScreenings = screenings.filter(
		(screening: ScreeningFull) =>
			screening.time.toUpperCase().includes("PM")
	);
	eveningScreenings.sort(
		(a: ScreeningFull, b: ScreeningFull) =>
			Number(a.time.replace(/[^0-9]/g, "")) -
			Number(b.time.replace(/[^0-9]/g, ""))
	);

	return [...morningScreenings, ...eveningScreenings];
};