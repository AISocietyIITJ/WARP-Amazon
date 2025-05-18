import { useState } from 'react';
import './Prompt.css';
// import CourseCard from '../components/CourseCard';

export default function Prompt() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);


  const handleSearch = async () => {
    setLoading(true);
    setSearched(true); 
    try {
      const response = await fetch('http://localhost:8000/output/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: search }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Search failed:', error);
      setResult(null);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h1>What Course Do You Want?</h1>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="search-button"
          disabled={!search.trim()}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading Recommendations...</p>}

      {!loading && result && (
  <div className="card-wrapper">
    <div className="result-card">
      <h2>{result.recommended_course}</h2>
      <p><strong>Difficulty:</strong> {result.difficulty_level}</p>
      <div className="reasoning-box">
        {result.llm_reasoning}
      </div>
    </div>
  </div>
)}


      {!loading && result === null && searched && (
        <p className="error-message">No results found. Try a different search.</p>
      )}
    </div>
  );
}
