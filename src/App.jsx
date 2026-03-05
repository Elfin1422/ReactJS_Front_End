import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components from your folders
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. This sets the default page to Login when you run the app */}
        <Route path="/" element={<Login />} />
        
        {/* 2. This defines the route for your Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 3. Catch-all: If the user types a random URL, send them back to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;