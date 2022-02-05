import React from "react";

const Week = ({ children }: { children: Array<JSX.Element> }) => (
	<tr className="w-full lg:flex lg:flex-row lg:flex-wrap">{children}</tr>
);

export default Week;
