import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
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
            const data = await registerUser(formData);
            
            console.log('Registration response:', data); // Debug log
            
            // Store token
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            
            // Handle user data - check if it exists
            const user = data.user || data;
            
            localStorage.setItem('userRole', user.role || formData.role);
            localStorage.setItem('userName', user.name || formData.name);
            localStorage.setItem('userEmail', user.email || formData.email);
            
            if (user._id || user.id) {
                localStorage.setItem('userId', user._id || user.id);
            }
            
            // Mark as registered and logged in
            if (handleRegistration) {
                handleRegistration();
            }
            if (setStatusLogin) {
                setStatusLogin();
            }
            
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
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
                            minLength="6"
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