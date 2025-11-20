import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

function Header({ loginStatus, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        // Clear all stored data
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        handleLogout();
        navigate('/');
    };

    return (
        <div className="header">
            <Link to="/" className="header-logo">
                <span className="header-title">Issue Tracker</span>
            </Link>
            <div className="header-actions">
                {!loginStatus ? (
                    <Link to="/login">
                        <button className="header-button">Login</button>
                    </Link>
                ) : (
                    <>
                        <Link to="/dashboard">
                            <button className="header-button">Dashboard</button>
                        </Link>
                        <Link to="/profile">
                            <button className="header-button">Profile</button>
                        </Link>
                        <button className="header-button" onClick={onLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;