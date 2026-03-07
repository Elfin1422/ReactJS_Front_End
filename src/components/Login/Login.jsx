import React, { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom'; 
import api from "../../api/axios"; // Import your axios configuration
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 
  
  // 1. Create states to hold the input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Handle the Actual Login Logic
  const handleLoginClick = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear previous errors

    try {
      // Send POST request to your Laravel API
      const response = await api.post('/login', {
        email: email,
        password: password
      });

      // Save the token returned by your AuthController
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      
      // Success! Go to dashboard
      navigate('/dashboard'); 
    } catch (err) {
      // Handle errors (Invalid credentials, etc.)
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error(err);
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="login-container">
      <div className="brand-section">
        <h1 className="brand-title">Fundraising</h1>
        <p className="brand-subtitle">Raising Funds for a Cause</p>
      </div>

      <div className="form-section">
        <div className="login-card">
          <h2 className="welcome-text">Welcome Back!</h2>
          <p className="signin-text">Sign in to your account</p>

          {/* Show error message if login fails */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form className="login-form" onSubmit={handleLoginClick}>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="example@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state
                required
              />
            </div>

            <button 
              type="submit" // Changed from "button" to "submit"
              className="login-btn" 
            >
              Login
            </button>
            
            <a href="#" className="forgot-password">Forgot password?</a>
            <div className="divider"></div>
            
            <button 
              type="button" 
              className="create-account-btn"
              onClick={handleCreateAccountClick}
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;