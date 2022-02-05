import React from "react";

const Loading = () => (
	<div className="absolute top-0 left-0 w-full h-screen bg-white flex items-center justify-center">
		<div className="block text-xl italic">fetching &apos;em movies...</div>
	</div>
);

export default Loading;
