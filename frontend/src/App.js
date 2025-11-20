import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CreateIssue from './components/CreateIssue';
import IssueDetails from './components/IssueDetails';
import Profile from './components/Profile';

function App() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user has visited before (localStorage)
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setIsFirstTimeUser(true);
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hasVisited');
    setIsFirstTimeUser(false);
  };

  const handleRegistration = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsFirstTimeUser(false);
  };

  // Don't render routes until initial check is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Header loginStatus={!!localStorage.getItem('token')} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/login' 
            element={
              localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : 
              <Login />
            } 
          />
          <Route 
            path='/register' 
            element={<Register handleRegistration={handleRegistration} />} 
          />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute isFirstTimeUser={isFirstTimeUser}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/create-issue' 
            element={
              <ProtectedRoute isFirstTimeUser={isFirstTimeUser}>
                <CreateIssue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/issue/:id' 
            element={
              <ProtectedRoute isFirstTimeUser={isFirstTimeUser}>
                <IssueDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute isFirstTimeUser={isFirstTimeUser}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          {/* Redirect any unknown routes to home */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
