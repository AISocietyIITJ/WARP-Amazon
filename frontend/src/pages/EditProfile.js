import { useState } from "react";
import './EditProfile.css';

export default function EditProfile() {
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentCGPA, setStudentCGPA] = useState("");
  const [studentBranch, setStudentBranch] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile Updated!");
  };

  const handleLogout = () => {
    setStudentName("");
    setStudentRollNo("");
    setStudentCGPA("");
    setStudentBranch("");
    alert("Logged out successfully!");
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2 className="edit-profile-title">Profile</h2>
        <form onSubmit={handleUpdateProfile} className="edit-profile-form">
          <div>
            <label className="edit-profile-label">Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="edit-profile-input"
            />
          </div>

          <div>
            <label className="edit-profile-label">Roll No:</label>
            <input
              type="text"
              placeholder="Enter Your Roll No"
              value={studentRollNo}
              onChange={(e) => setStudentRollNo(e.target.value)}
              required
              className="edit-profile-input"
            />
          </div>

          <div>
            <label className="edit-profile-label">CGPA:</label>
            <input
              type="number"
              placeholder="Enter Your CGPA"
              value={studentCGPA}
              onChange={(e) => setStudentCGPA(e.target.value)}
              required
              step="0.01"
              min="0"
              max="10"
              className="edit-profile-input"
            />
          </div>

          <div>
            <label className="edit-profile-label">Branch:</label>
            <input
              type="text"
              placeholder="Enter Your Branch"
              value={studentBranch}
              onChange={(e) => setStudentBranch(e.target.value)}
              required
              className="edit-profile-input"
            />
          </div>

          <button type="submit" className="edit-profile-button update">
            Update Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="edit-profile-button logout"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
