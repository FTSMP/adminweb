import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Table.css"; // Import the CSS file for styles

const BankTransaction = () => {
  const [banktransactions, setBanktransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanktransactions = async () => {
      try {
        const response = await axios.get(
          "http://18.138.76.236:3000/api/banktransaction"
        );
        if (response.data.success) {
          setBanktransactions(response.data.data);
        } else {
          setError("Error fetching Bank transactions.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error fetching Bank transactions.");
      }
    };

    fetchBanktransactions();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="table-container">
      <h1 className="table-title">Bank Transactions</h1>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account ID</th>
              <th>Status</th>
              <th>Money</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {banktransactions.map((transaction) => (
              <tr key={transaction.ID}>
                <td>{transaction.ID}</td>
                <td>{transaction.AccountID}</td>
                <td>
                  <span
                    className={`status ${
                      transaction.ToOrFrom === "Withdraw"
                        ? "withdraw"
                        : "deposit"
                    }`}
                  >
                    {transaction.ToOrFrom}
                  </span>
                </td>
                <td>${transaction.Money.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankTransaction;
