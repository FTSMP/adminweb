import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Table.css"; // Import the CSS file for styles

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://18.138.76.236:3000/api/accounts");
        if (response.data.success) {
          setAccounts(response.data.data);
        } else {
          setError("Error fetching accounts.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error fetching accounts.");
      }
    };

    fetchAccounts();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="table-container">
      <h1 className="table-title">Accounts List</h1>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              {/* <th>Status</th> */}
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Money</th>
              <th>Rockstar ID</th>
              <th>Bank Account</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.ID}>
                {/* <td>{account.ID}</td> */}
                <td>{account.ID}</td>
                <td>{account.FirstName}</td>
                <td>{account.LastName}</td>
                <td>{account.Email}</td>
                <td>{account.JoinDate}</td>
                <td>{account.Money}</td>
                <td>{account.RockStarID}</td>
                <td>{account.BankAccount}</td>
                <td>
                  <Link to={`/account/${account.ID}`}>
                    <button className="view-button">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountList;
