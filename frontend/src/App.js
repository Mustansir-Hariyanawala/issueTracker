import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [hasLoggedIn, setLoginStatus] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  // Check if user has visited before (localStorage)
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstTimeUser(true);
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
          {/* Redirect any unknown routes to home */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
