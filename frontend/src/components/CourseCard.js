import React from "react";
import "./CourseCard.css"; 

function CourseCard({ title, description, link }) {
  return (
    <div className="course-card">
      <h2 className="course-title">{title}</h2>
      <p className="course-description">
        {description.length > 100 ? description.slice(0, 100) + "..." : description}
      </p>
      <a
        href={link}
        className="course-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More →
      </a>
    </div>
  );
}

export default CourseCard;
