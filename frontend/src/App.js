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
  const [hasLoggedIn, setLoginStatus] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  // Check if user has visited before (localStorage)
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    const token = localStorage.getItem('token');
    
    if (!hasVisited) {
      setIsFirstTimeUser(true);
    }
    
    // Check if user is already logged in
    if (token) {
      setLoginStatus(true);
    }
  }, []);

  const setStatusLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  const handleRegistration = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsFirstTimeUser(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Header loginStatus={hasLoggedIn} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/login' 
            element={
              hasLoggedIn ? <Navigate to="/dashboard" replace /> : 
              <Login setStatusLogin={setStatusLogin} />
            } 
          />
          <Route 
            path='/register' 
            element={<Register handleRegistration={handleRegistration} setStatusLogin={setStatusLogin} />} 
          />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute isAuthenticated={hasLoggedIn} isFirstTimeUser={isFirstTimeUser}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/create-issue' 
            element={
              <ProtectedRoute isAuthenticated={hasLoggedIn} isFirstTimeUser={isFirstTimeUser}>
                <CreateIssue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/issue/:id' 
            element={
              <ProtectedRoute isAuthenticated={hasLoggedIn} isFirstTimeUser={isFirstTimeUser}>
                <IssueDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute isAuthenticated={hasLoggedIn} isFirstTimeUser={isFirstTimeUser}>
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
