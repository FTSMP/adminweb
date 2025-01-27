import React from "react";
import "../css/UserCard.css";

const UserCard = ({ icon, title, count, bgColor }) => {
  return (
    <div className="user-card" style={{ backgroundColor: bgColor }}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-count">{count}</p>
      </div>
    </div>
  );
};

export default UserCard;
