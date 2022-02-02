import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import { Routes, Route } from "react-router-dom";
import Showtimes from "./components/Showtimes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  return (
    <div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Calendar />} />
				<Route path="showtimes/:day" element={<Showtimes />} />
				<Route path="about" element={<About />} />
			</Routes>
			<Footer />
    </div>
  );
}

export default App;
