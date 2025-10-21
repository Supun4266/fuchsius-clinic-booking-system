import React from "react";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">FUCHSIUS Clinic</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Doctors</a>
          <a href="#">Contact</a>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      <section className="signup-section">
        <h2>Sign up for a new account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your full name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" required />

          <button type="submit" className="signup-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <a href="#">Login</a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;

