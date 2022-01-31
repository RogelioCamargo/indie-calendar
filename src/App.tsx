import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import { Routes, Route, Link } from "react-router-dom";
import Showtimes from "./components/Showtimes";

const App = () => {
  return (
    <div className="App">
			<div className="bg-black py-10">
				<Link to="/">
					<h1 className="text-3xl text-white lg:text-4xl font-bold tracking-wide">
						Indie Theater Screenings
					</h1>
				</Link>
			</div>
			<Routes>
				<Route path="/" element={<Calendar />} />
				<Route path="showtimes/:day" element={<Showtimes />} />
			</Routes>
			<div className="bg-black text-white py-10 mt-16 text-sm">
				<span className="block mb-1">INDIE THEATER SCREENINGS</span>
				<span className="block text-xs">ALL DATA WAS SCRAPED FROM THESE THEATERS WEBSITES</span>
			</div>
    </div>
  );
}

export default App;
