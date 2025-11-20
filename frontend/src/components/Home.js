import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Issue Tracker</h1>
            <p>Track and manage your issues efficiently</p>
            <div style={{ marginTop: '30px' }}>
                <Link to="/login">
                    <button style={{ padding: '10px 20px', margin: '0 10px', fontSize: '16px' }}>
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button style={{ padding: '10px 20px', margin: '0 10px', fontSize: '16px' }}>
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
