import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

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
    <div className="text-center mt-5 home-container" style={{ backgroundImage: `url(${require("/src/img/f1background_image.png")})` }}>
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
      {/* Display qualifying results */}
      <div className = "tables-container">
        <div>
          <h3>Qualifying Results</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Q1 Time</th>
                <th>Q2 Time</th>
                <th>Q3 Time</th>
              </tr>
            </thead>
            <tbody>
              {store.qualifyingResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.position}</td>
                  <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                  <td>{result.Constructor.name}</td>
                  <td>{result.Q1}</td>
                  <td>{result.Q2}</td>
                  <td>{result.Q3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Display race results */}
        <div>
          <h3>Race Results</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Constructor</th>
                {/* Add other relevant race result fields here */}
              </tr>
            </thead>
            <tbody>
              {/* Iterate over race results and render each row */}
              {/* Use selectedRace from state to render race results */}
              {store.raceResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.position}</td>
                  <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                  <td>{result.Constructor.name}</td>
                  {/* Add other relevant race result fields here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};









