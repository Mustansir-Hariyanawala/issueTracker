import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setStatusLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // TEMPORARY: Comment out API call for testing without backend
            /*
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store token if your API returns one
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                // Store user role and name
                if (data.role) {
                    localStorage.setItem('userRole', data.role);
                }
                if (data.user && data.user.name) {
                    localStorage.setItem('userName', data.user.name);
                } else if (data.name) {
                    localStorage.setItem('userName', data.name);
                }
                setStatusLogin(true);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
            */

            // TEMPORARY: Simulate successful login
            localStorage.setItem('token', 'temp-token-123');
            localStorage.setItem('userRole', 'resident'); // Change to 'admin' or 'technician' to test different roles
            localStorage.setItem('userName', formData.email.split('@')[0]);
            localStorage.setItem('userEmail', formData.email);
            setStatusLogin(true);
            navigate('/dashboard');
            
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="login-footer">
                    Not Registered? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>  
    );
}

export default Login;