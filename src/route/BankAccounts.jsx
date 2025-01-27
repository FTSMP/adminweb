import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Table.css"; // Import the CSS file for styles

const BankAccounts = () => {
  const [BankAccounts, setBankAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(
          "http://18.138.76.236:3000/api/bankaccounts"
        );
        if (response.data.success) {
          setBankAccounts(response.data.data);
        } else {
          setError("Error fetching Bank Accounts.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error fetching Bank Accounts.");
      }
    };

    fetchBankAccounts();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="table-container">
      <h1 className="table-title">Bank Accounts</h1>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Number</th>
              <th>Balance</th>
              <th>Card Number</th>
            </tr>
          </thead>
          <tbody>
            {BankAccounts.map((account) => (
              <tr key={account.ID}>
                <td>{account.ID}</td>
                <td>{account.Owner}</td>
                <td>{account.Number}</td>
                <td>{account.Balance}</td>
                <td>{account.CardNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankAccounts;
