import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import QualiResults from "/src/js/component/qualiresults.js";
import RaceResults from "/src/js/component/raceresults.js";

import f1car from "/src/img/f1background_image.png";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedRound, setSelectedRound] = useState("");
  const [selectedRace, setSelectedRace] = useState("");

  useEffect(() => {
    actions.fetchDrivers(2024);
    actions.fetchCircuits(2024); 
  }, []);

  const handleRaceChange = (e) => {
    const selectedRound = e.target.value;
    setSelectedRound(selectedRound);
    if (selectedRound) {
      // Fetch both qualifying and race results for the selected round
      actions.fetchQualifyingResults(2024, selectedRound);
      actions.fetchRaceResults(2024, selectedRound);
    }
  };

  // Check if circuitsByRound is defined
  if (!store.circuitsByRound) {
    return <div>Loading...</div>; // or return null if you want to render nothing until data is loaded
  }

  return (
    <div className="text-center  home-container" style={{ backgroundImage: `url(${f1car})` }}>
      <h2>Driver Performance Comparison</h2>
      <select value={selectedRound} onChange={handleRaceChange}>
        <option value="">Select a race</option>
        {/* Iterate over circuits grouped by round numbers */}
        {store.circuitsByRound.map((round, roundIndex) => (
          <optgroup label={`Round ${round.round}`} key={roundIndex}>
            {/* Iterate over circuits within each round */}
            {round.circuits.map((circuit, index) => (
              <option key={index} value={round.round}>
                {circuit.circuitName}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {/* Qualifier results component*/}
      <QualiResults results={store.qualifyingResults} />
      {/* Race results component */}
      <RaceResults raceResults={store.raceResults} />
    </div>
  );
};

export default Home;










