import React from "react";
import { Screening } from "../../types";
import { getClassesForScreeningPreview, getDayOfTheMonth } from "./utils";
import { HashLink } from "react-router-hash-link";

const ScreeningPreview = ({ screening, day }: { screening: Screening, day: Date }) => (
	<div className={`text-sm text-left mb-2 md:mb-3 lg:text-xs ${getClassesForScreeningPreview(day)}`}>
		<HashLink to={`/showtimes/${getDayOfTheMonth(day)}#${screening.id}`}>
			{console.log(`/showtimes/${getDayOfTheMonth(day)}#${screening.id}`)}
			<span className="block font-bold mb-px">{screening.time}</span>
			<span className="block">{screening.title.toUpperCase()}</span>
		</HashLink>
	</div>
);

export default ScreeningPreview;