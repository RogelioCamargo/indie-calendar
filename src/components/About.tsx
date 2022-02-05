import React, { useEffect } from "react";

const About = () => {
	useEffect(() => {
		document.title = "About";
	});

	return (
		<div className="about-container px-10 flex flex-col justify-center">
			<h2 className="font-bold">
				Hello, I hope this website provides some value to you! :)
			</h2>
			<p className="mt-5">
				Data was scraped using puppeteer. Go enjoy a movie!
			</p>
		</div>
	);
};

export default About;
