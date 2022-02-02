import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="flex items-center justify-between h-20 md:h-24 px-5">
			<Link to="/">
				<h1 className="text-left text-4xl text-black lg:text-5xl font-bold tracking-wide">
					<span className="text-red-500 font-comforter">la</span>film
				</h1>
			</Link>
			<nav className="">
				<Link to="/">
					<span className="md:text-lg">
						Calendar
					</span>
				</Link>
				<Link to="/">
					<span className="ml-5 md:text-lg">
						About
					</span>
				</Link>
			</nav>
		</div>
	)
};

export default Header;