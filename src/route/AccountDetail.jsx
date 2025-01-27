import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AccountDetails.css"; // Importing the CSS file for styles

const AccountDetails = () => {
  const { id } = useParams(); // Retrieve the ID from the URL
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `http://18.138.76.236:3000/api/account/${id}`
        );
        if (response.data.success) {
          setAccount(response.data.data); // Save the account details
        } else {
          setError(response.data.message || "Account not found");
        }
      } catch (err) {
        console.error("Error fetching account details:", err);
        setError("Error fetching account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <p className="error-text">{error}</p>;

  // Handle the "Go Back" button click to navigate to the accounts page
  const handleGoBack = () => {
    navigate("/accounts"); // Navigate to the accounts page
  };

  return (
    <div className="account-details-container">
      <div className="account-details-card">
        <h1 className="account-details-title">Account Details</h1>
        <div className="account-info">
          <p>
            <strong>ID:</strong> {account.ID}
          </p>
          <p>
            <strong>First Name:</strong> {account.FirstName}
          </p>
          <p>
            <strong>Last Name:</strong> {account.LastName}
          </p>
          <p>
            <strong>Email:</strong> {account.Email}
          </p>
          <p>
            <strong>Join Date:</strong> {account.JoinDate}
          </p>
          <p>
            <strong>Money:</strong> {account.Money}
          </p>
          <p>
            <strong>Rockstar ID:</strong> {account.RockStarID}
          </p>
          <p>
            <strong>Bank Account:</strong> {account.BankAccount}
          </p>
        </div>
        <div className="account-actions">
          <button className="back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
