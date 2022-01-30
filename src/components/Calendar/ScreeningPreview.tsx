import React from "react";
import { Screening } from "../../types";
import { getClassesForScreeningPreview } from "./utils";

const ScreeningPreview = ({ screening, day }: { screening: Screening, day: Date }) => (
	<div className={`text-sm mb-2 lg:text-xs cursor-pointer ${getClassesForScreeningPreview(day)}`}>
		{screening.title.toUpperCase()} | {screening.time}
	</div>
);

export default ScreeningPreview;