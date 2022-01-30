import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl lg:text-4xl font-bold tracking-wide mt-12 mb-10">Indie Theater Screenings</h1>
			<Routes>
				<Route path="/" element={<Calendar />} />
				{/* <Route path="/:day" /> */}
			</Routes>
    </div>
  );
}

export default App;
