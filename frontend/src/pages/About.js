import React from "react";
import "./About.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1>Course Recommender</h1>
        <h2>A WARP 2025 Project</h2>

        <div className="section">
          <h3>Mentors:</h3>
          <p>Madhav</p>
          <p>Sirin</p>
        </div>

        <div className="section">
          <h3>Mentees:</h3>
          <p>Mohit</p>
          <p>Abhinav</p>
          <p>Siddhant</p>
          <p>Soham</p>
          <p>Brijesh</p>
          <p>Akshaya</p>
          <p>Likhita</p>
        </div>
      </div>
    </div>
  );
}
