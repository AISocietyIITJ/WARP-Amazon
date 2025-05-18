import CourseCard from "../components/CourseCard";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Trending Courses</h1>

      <div className="course-grid">
        <CourseCard
          title="Explore AI"
          description="Discover the power of artificial intelligence, from machine learning to deep neural networks."
          link="/courses/ai"
        />
        <CourseCard
          title="Mathematics Mastery"
          description="Strengthen your math skills with courses on algebra, calculus, and real-world problem solving."
          link="/courses/math"
        />
        <CourseCard
          title="Data Science Essentials"
          description="Learn data analysis, visualization, and predictive modeling using Python and SQL."
          link="/courses/data-science"
        />

      </div>
    </div>
  );
}
