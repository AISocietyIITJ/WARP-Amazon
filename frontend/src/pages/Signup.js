import React, { useState } from "react";
import './Signup.css';
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    } else {
      setPasswordMatchError("");
    }

    if (validatePassword(password) && validateEmail(email)) {
      try {
        const response = await fetch("http://localhost:8000/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Signup successful!");
          window.location.href = "/login";
        } else {
          alert(data.detail || "Signup failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>

        <form onSubmit={handleSignup} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          {passwordError && <p className="error-text">{passwordError}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
          {passwordMatchError && <p className="error-text">{passwordMatchError}</p>}

          <button type="submit" className="signup-button" onClick={() => navigate('/login')} >Sign Up</button>
        </form>

        <p className="link-text">
          Already have an account?{" "}
          <a href="/login" className="login-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
