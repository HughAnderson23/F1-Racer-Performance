import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const [selectedRound, setSelectedRound] = useState("");

  useEffect(() => {
    actions.fetchDrivers(2024);
    actions.fetchCircuits(2024); 
  }, []);

  const handleCircuitChange = (e) => {
    const selectedRound = e.target.value;
    setSelectedRound(selectedRound);
    if (selectedRound) {
      // Construct the URL with the selected round number and year
      actions.fetchQualifyingResults(2024, selectedRound);
    }
  };
  

  // Check if circuitsByRound is defined
  if (!store.circuitsByRound) {
    return <div>Loading...</div>; // or return null if you want to render nothing until data is loaded
  }

  return (
    <div className="text-center mt-5">
      <h2>Driver Performance Comparison</h2>
      <select value={selectedCircuit} onChange={handleCircuitChange}>
        <option value="">Select a circuit</option>
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
  );
};







