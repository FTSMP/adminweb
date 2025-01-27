import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://18.138.76.236:3000/api/login", {
        username,
        password,
      });
      if (response.data.success) {
        login(); // Update auth state
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main-main-container">
      <div className="main-container">
        <div className="login-container">
          <div className="login-box">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Admin ID</label>
                <input
                  type="text"
                  placeholder="Enter your Admin ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-container">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="login-button">
                Login now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
