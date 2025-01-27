import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Table.css"; // Ensure correct path for your CSS

const PlayerVehicles = () => {
  const [playervehicles, setPlayerVehicles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayerVehicles = async () => {
      try {
        const response = await axios.get(
          "http://18.138.76.236:3000/api/playervehicles"
        );
        setPlayerVehicles(response.data); // Assuming direct array response
      } catch (err) {
        console.error("Error fetching Player Vehicles:", err);
        setError("Error fetching Player Vehicles.");
      }
    };

    fetchPlayerVehicles();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="table-container">
      <h1 className="table-title">Player Vehicles List</h1>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Model</th>
              <th>Plate</th>
              <th>Insurance</th>
            </tr>
          </thead>
          <tbody>
            {playervehicles.length > 0 ? (
              playervehicles.map((vehicle) => (
                <tr key={vehicle.ID}>
                  <td>{vehicle.Owner}</td>
                  <td>{vehicle.Model}</td>
                  <td>{vehicle.Plate}</td>
                  <td>
                    <span className={`status`}>{vehicle.Insurance}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Player Vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerVehicles;
