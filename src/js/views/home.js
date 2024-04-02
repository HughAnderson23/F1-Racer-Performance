import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchDrivers(2024);
  }, []); 

  return (
    <div className="text-center mt-5">
      <h2>Driver List for 2024 Season</h2>
      <ul>
        {store.drivers.map((driver, index) => (
          <li key={index}>{driver.givenName} {driver.familyName}</li>
        ))}
      </ul>
    </div>
  );
};
