import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Handle HTTP errors (404, 401, etc.)
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }
  
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);  // Show the actual error message (e.g., "User not found")
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button" onClick={() => navigate('/')}>
  Login
</button>

        </form>
        <p className="login-footer">
          Don’t have an account?{" "}
          <a href="/signup" className="login-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
