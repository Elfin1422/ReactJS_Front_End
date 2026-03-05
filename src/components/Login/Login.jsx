import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  // This function runs immediately when the button is clicked
  const handleLoginClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <div className="brand-section">
        <h1 className="brand-title">Fundraising</h1>
        <p className="brand-subtitle">Rasing Funds for a Cause</p>
      </div>

      <div className="form-section">
        <div className="login-card">
          <h2 className="welcome-text">Welcome Back!</h2>
          <p className="signin-text">Sign in to your account</p>

          <div className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="example@example.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
            </div>

            {/* Unconditional click handler */}
            <button 
              type="button" 
              className="login-btn" 
              onClick={handleLoginClick}
            >
              Login
            </button>
            
            <a href="#" className="forgot-password">Forgot password?</a>
            <div className="divider"></div>
            <button type="button" className="create-account-btn">Create new account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;