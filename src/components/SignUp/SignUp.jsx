import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/');
  };

  return (
    <div className="signup-page-container">
      {/* Brand Side (Left) */}
      <div className="brand-section">
        <h1 className="brand-title">Fundraising</h1>
        <p className="brand-subtitle">Raising Funds for a Cause</p>
      </div>

      {/* Form Side (Right) */}
      <div className="form-section">
        <div className="signup-card">
          <h2 className="welcome-text">Create Account</h2>
          <p className="signin-text">Join the fundraising cause</p>

          <div className="signup-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="example@example.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
            </div>

            <button className="signup-btn" onClick={handleSignUp}>
              Sign Up
            </button>
            
            <div className="divider"></div>

            <p className="login-link-text">Already have an account?</p>
            <button className="back-login-btn" onClick={() => navigate('/')}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;