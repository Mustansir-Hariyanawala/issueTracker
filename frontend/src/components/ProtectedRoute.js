import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, isFirstTimeUser }) => {
    // If first time user, redirect to registration
    if (isFirstTimeUser) {
        return <Navigate to="/register" replace />;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
