import React from "react";
import { Screening } from "../../types";
import { getClassesForScreeningPreview } from "./utils";

const ScreeningPreview = ({ screening, day }: { screening: Screening, day: Date }) => (
	<div className={`text-sm text-left mb-2  md:mb-3 lg:text-xs ${getClassesForScreeningPreview(day)}`}>
		<span className="block font-bold mb-px">{screening.time}</span>
		<span className="block">{screening.title.toUpperCase()}</span>
	</div>
);

export default ScreeningPreview;