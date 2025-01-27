import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "../css/Table.css";

const adminLevels = {
  1: { name: "Assistant", color: "#08fda0" },
  2: { name: "Junior Admin", color: "#17c2b9" },
  3: { name: "Server Admin", color: "#121bcf" },
  4: { name: "Curator", color: "#7f06f8" },
  5: { name: "Senior Admin", color: "#ec1c64" },
  6: { name: "Curator of Admin", color: "#1ee3d6" },
  7: { name: "Chief / Deputy Chief Admin", color: "#2cc972" },
  8: { name: "Curator of Project", color: "#151d3c" },
  9: { name: "Project Manger", color: "#FF5733" },
};

export const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To navigate to AdminDetails

  useEffect(() => {
    axios
      .get("http://18.138.76.236:3000/api/admins")
      .then((response) => setAdmins(response.data))
      .catch((error) => setError("Error fetching admin data."));
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.AdminID?.toString().includes(search) || // Search by AdminID
      admin.FirstName?.toLowerCase().includes(search.toLowerCase()) // Search by FirstName
  );

  const viewDetails = (adminID) => {
    navigate(`/admin/${adminID}`); // Navigate to AdminDetails page
  };

  return (
    <div className="table-container">
      <h1 className="table-title">Admin List</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Admin ID ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-text">{error}</div>}

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Player ID</th>
              <th>Admin ID</th>
              <th>Name</th>
              <th>Admin Rank</th>
              <th>Admin Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr key={admin.AdminID}>
                  <td>{admin.UID}</td>
                  <td>{admin.AdminID}</td>
                  <td>{admin.Name}</td>
                  <td>
                    <span
                      className="admin-rank"
                      style={{
                        backgroundColor:
                          adminLevels[admin.AdminLVL]?.color || "#000",
                        padding: "5px 10px",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      {adminLevels[admin.AdminLVL]?.name || "Unknown"}
                    </span>
                  </td>
                  <td>{admin.AdminLVL}</td>
                  <td>
                    <span
                      className={`status-box ${
                        admin.Status === 1 ? "status-online" : "status-offline"
                      }`}
                    >
                      {admin.Status === 1 ? "Online" : "Offline"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
