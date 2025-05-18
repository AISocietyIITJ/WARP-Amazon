import React from "react";
import "./Profile.css"
import "./account.png"

export default function ProfilePage() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src="/home/warp/amazon/integ_react/frontend/src/components/account.png" alt="profile phot" className="profile-pic"/>
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> Student Name</p>
          <p><strong>Email:</strong> student@email.com</p>
          <p><strong>Branch:</strong> Chemical</p>
          <p><strong>Roll No.:</strong> B24XY1001</p>
        </div>
      </div>
    </div>
  );
}