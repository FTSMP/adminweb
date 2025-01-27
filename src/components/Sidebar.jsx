import React from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserShield,
  faUsers,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthContext";

export const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // alert("Logged out successfully");
  };

  return (
    <div className="sidebar">
      <nav>
        <div className="logo-container">
          <span className="logo">R</span>
          <div className="text">
            <p style={{ color: "#ca3dff" }}>GTA 5</p>
            <p style={{ color: "#00c2ff" }}>Revival City Roleplay</p>
            <p style={{ color: "#ca3dff" }}>Admin Panel</p>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admins" className="sidebar-link">
              <FontAwesomeIcon icon={faUserShield} className="sidebar-icon" />
              Admins
            </Link>
          </li>
          <li>
            <Link to="/accounts" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Accounts
            </Link>
          </li>
          <li>
            <Link to="/bankaccounts" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Bank Accounts
            </Link>
          </li>
          <li>
            <Link to="/banktransaction" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Bank Transaction
            </Link>
          </li>
          <li>
            <Link to="/playervehicles" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Player Vehicles
            </Link>
          </li>
          {/* <li>
            <Link onClick={handleLogout} className="sidebar-link">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="sidebar-icon"
              />
              Logout
            </Link>
          </li> */}
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="sidebar-icon"
        />
        Log Out
      </button>
    </div>
  );
};
