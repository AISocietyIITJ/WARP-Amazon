import React from "react";
import "./Profile.css"
import "./account.png"

export default function ProfilePage() {
  const userData = JSON.parse(sessionStorage.getItem('userData')) || {
    name: "Student Name",
    email: "student@email.com",
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src="/home/warp/amazon/integ_react/frontend/src/components/account.png" alt="profile phot" className="profile-pic"/>
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>
    </div>
  );
}
