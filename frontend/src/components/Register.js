import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register({ handleRegistration, setStatusLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'resident'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // TEMPORARY: Comment out API call for testing without backend
            /*
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Mark as registered
                if (handleRegistration) {
                    handleRegistration();
                }
                // Store token if your API returns one
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                // Store user role and name
                if (data.role) {
                    localStorage.setItem('userRole', data.role);
                } else {
                    localStorage.setItem('userRole', formData.role);
                }
                if (data.user && data.user.name) {
                    localStorage.setItem('userName', data.user.name);
                } else if (data.name) {
                    localStorage.setItem('userName', data.name);
                } else {
                    localStorage.setItem('userName', formData.name);
                }
                // Log in the user
                if (setStatusLogin) {
                    setStatusLogin();
                }
                navigate('/dashboard');
            } else {
                setError(data.message || 'Registration failed');
            }
            */

            // TEMPORARY: Simulate successful registration
            if (handleRegistration) {
                handleRegistration();
            }
            localStorage.setItem('token', 'temp-token-123');
            localStorage.setItem('userRole', formData.role);
            localStorage.setItem('userName', formData.name);
            localStorage.setItem('userEmail', formData.email);
            if (setStatusLogin) {
                setStatusLogin();
            }
            navigate('/dashboard');
            
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                <p className="register-subtitle">Create your account to get started</p>
                <form onSubmit={onRegister} className="register-form">
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
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
                    <div className="form-group">
                        <label className="form-label">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="resident">Resident</option>
                            <option value="admin">Admin</option>
                            <option value="technician">Technician</option>
                        </select>
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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="register-footer">
                    Already Registered? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;