import React from "react";

const Week = ({ children }: { children: Array<JSX.Element>}) => (
	<div className="w-full lg:flex lg:flex-row lg:flex-wrap">
		{children}
	</div>
);

export default Week;