import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios"; // Ensure this path is correct based on your file structure
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send data to your Laravel AuthController signup method
      const response = await api.post('/signup', {
        name: name,
        email: email,
        password: password
      });

      // Save the token returned by the backend
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      
      // Navigate to dashboard upon success
      navigate('/dashboard');
    } catch (err) {
      // Display validation or server errors
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="brand-section">
        <h1 className="brand-title">Fundraising</h1>
        <p className="brand-subtitle">Raising Funds for a Cause</p>
      </div>

      <div className="form-section">
        <div className="signup-card">
          <h2 className="welcome-text">Create Account</h2>
          <p className="signin-text">Join the fundraising cause</p>

          {error && <p className="error-text" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form className="signup-form" onSubmit={handleSignUp}>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="example@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <div className="divider"></div>

            <p className="login-link-text">Already have an account?</p>
            <button type="button" className="back-login-btn" onClick={() => navigate('/')}>
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;