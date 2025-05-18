import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Output() {
  const { state } = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.searchQuery) return;

    const fetchRecommendation = async () => {
      try {
        const response = await fetch("http://localhost:8000/output/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: state.searchQuery }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [state]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (!result) {
    return <div>No recommendations found. Try searching again.</div>;
  }

  return (
    <div>
      <h1>Your Recommended Course</h1>
      <div>
        <h2>{result.recommended_course}</h2>
        <p>Difficulty: {result.difficulty_level}</p>
        <p>Why this course? {result.llm_reasoning}</p>
      </div>
    </div>
  );
}
