import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ loginStatus, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Issue Tracker</span>
            </Link>
            <div style={{ display: 'flex', gap: '10px' }}>
                {!loginStatus ? (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                ) : (
                    <>
                        <Link to="/dashboard">
                            <button>Dashboard</button>
                        </Link>
                        <button>Profile</button>
                        <button onClick={onLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;