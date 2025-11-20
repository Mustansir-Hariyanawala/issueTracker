import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, isFirstTimeUser }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Check token from localStorage directly on mount
        const token = localStorage.getItem('token');
        const hasVisited = localStorage.getItem('hasVisited');
        
        // If first time user, redirect to registration
        if (!hasVisited) {
            return;
        }
        
        // If no token, user is not authenticated
        if (!token) {
            setIsReady(true);
            return;
        }

        // Token exists, authenticated
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <div>Loading...</div>;
    }

    // If first time user, redirect to registration
    if (isFirstTimeUser) {
        return <Navigate to="/register" replace />;
    }
    
    // Check token directly instead of relying on parent state
    const token = localStorage.getItem('token');
    
    // If not authenticated, redirect to login
    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }
    
    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
