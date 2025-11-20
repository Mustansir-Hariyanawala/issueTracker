import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Welcome to Issue Tracker</h1>
                <p className="home-subtitle">Track and manage your issues efficiently</p>
                <div className="home-buttons">
                    <Link to="/login">
                        <button className="home-button">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="home-button secondary">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
