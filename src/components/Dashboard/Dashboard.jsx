import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cashGoal, setCashGoal] = useState(100); 
  const navigate = useNavigate(); 
  
  
  const cashRaised = 12; 

  
  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="content-area">
          <h1>Overview</h1>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Cash Raised</h3>
              <p className="stat-value">${cashRaised}</p>
              <span className="stat-label">Fixed Amount</span>
            </div>
            <div className="stat-card goal-card">
              <h3>Cash Goal</h3>
              <p className="stat-value">${cashGoal}</p>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${Math.min((cashRaised / cashGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'options') {
      return (
        <div className="content-area">
          <h1>Options & Settings</h1>
          <div className="settings-card">
            <h3>Update Financial Goals</h3>
            <div className="input-group">
              <label>Set New Cash Goal ($)</label>
              <input 
                type="number" 
                value={cashGoal} 
                onChange={(e) => setCashGoal(e.target.value)}
                placeholder="Enter goal amount"
              />
            </div>
            <p className="hint-text">Note: Cash Raised is locked at ${cashRaised} in source code.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">Fundraiser</div>
        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'options' ? 'active' : ''} 
            onClick={() => setActiveTab('options')}
          >
            Options
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Body */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;