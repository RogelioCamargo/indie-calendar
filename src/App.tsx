import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl lg:text-4xl font-bold tracking-wide mt-12 mb-10">Indie Theater Screenings</h1>
			<Calendar />
    </div>
  );
}

export default App;
