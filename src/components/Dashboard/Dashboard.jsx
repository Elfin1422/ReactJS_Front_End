import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from "../../api/axios"; 
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  
  // Account Settings States
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const navigate = useNavigate(); 
  const [cashGoal, setCashGoal] = useState(100); 
  const cashRaised = 12; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        setNewName(response.data.name); 
        setLoading(false);
      } catch (err) {
        // Only redirect if the error is actually "Unauthorized" (401)
        if (err.response?.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN');
          navigate('/'); 
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    try {
      const response = await api.put('/user/update', {
        name: newName,
        password: newPassword
      });
      setUser(response.data.user);
      setStatusMsg("Profile updated successfully!");
      setNewPassword(''); 
    } catch (err) {
      setStatusMsg("Failed to update profile. Check your connection.");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout'); 
    } finally {
      localStorage.removeItem('ACCESS_TOKEN');
      navigate('/');
    }
  };

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
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

      case 'account':
        return (
          <div className="content-area">
            <h1>Account Settings</h1>
            <form className="settings-card" onSubmit={handleUpdateAccount}>
              {statusMsg && <p className="status-banner">{statusMsg}</p>}
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required
                />
              </div>
              <div className="input-group">
                <label>New Password (Optional)</label>
                <input 
                  type="password" 
                  placeholder="Leave blank to keep current" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        );

      case 'options':
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
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
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
            className={activeTab === 'account' ? 'active' : ''} 
            onClick={() => setActiveTab('account')}
          >
            Account Settings
          </button>
          <button 
            className={activeTab === 'options' ? 'active' : ''} 
            onClick={() => setActiveTab('options')}
          >
            Options
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;