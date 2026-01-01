import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIssues, getMyIssues } from '../services/api';
import IssueCard from './IssueCard';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, new, assigned, in-progress, resolved
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        // Get role from localStorage first (set during login)
        const storedRole = localStorage.getItem('userRole');
        const storedName = localStorage.getItem('userName');
        
        if (storedRole) {
            setUserRole(storedRole);
            setUserName(storedName || 'User');
        }

        // Fetch user profile to confirm role
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:3000/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const user = await response.json();
                    setUserRole(user.role);
                    setUserName(user.name);
                    localStorage.setItem('userRole', user.role);
                    localStorage.setItem('userName', user.name);
                } else if (response.status === 401) {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    useEffect(() => {
        // Fetch issues when userRole is available
        if (userRole) {
            fetchIssues();
        }
    }, [userRole]);

    const fetchIssues = async () => {
        setLoading(true);
        setError('');
        try {
            let data;
            if (userRole === 'admin' || userRole === 'technician') {
                data = await getAllIssues();
            } else {
                data = await getMyIssues();
            }

            if (Array.isArray(data)) {
                setIssues(data);
            } else if (data.issues && Array.isArray(data.issues)) {
                setIssues(data.issues);
            } else {
                setIssues([]);
            }
        } catch (err) {
            setError(err.message || 'Failed to load issues');
            console.error('Fetch issues error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredIssues = () => {
        let filtered = issues;

        if (filter !== 'all') {
            const statusMap = {
                'new': 'New',
                'assigned': 'Assigned',
                'in-progress': 'In Progress',
                'resolved': 'Resolved'
            };
            filtered = filtered.filter(issue => issue.status === statusMap[filter]);
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(issue => issue.category === categoryFilter);
        }

        return filtered;
    };

    const getStatusCounts = () => {
        return {
            total: issues.length,
            new: issues.filter(i => i.status === 'New').length,
            assigned: issues.filter(i => i.status === 'Assigned').length,
            inProgress: issues.filter(i => i.status === 'In Progress').length,
            resolved: issues.filter(i => i.status === 'Resolved').length
        };
    };

    const counts = getStatusCounts();
    const filteredIssues = getFilteredIssues();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    {userRole === 'admin' ? 'Admin Dashboard' : 
                     userRole === 'technician' ? 'Technician Dashboard' : 
                     'My Issues'}
                </h1>
                <p className="dashboard-subtitle">
                    Welcome, {userName || 'User'}!
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card" style={{'--card-color': '#007bff', '--card-color-dark': '#0056b3'}}>
                    <h3 className="stat-number">{counts.total}</h3>
                    <p className="stat-label">Total Issues</p>
                </div>
                <div className="stat-card" style={{'--card-color': '#17a2b8', '--card-color-dark': '#117a8b'}}>
                    <h3 className="stat-number">{counts.new}</h3>
                    <p className="stat-label">New</p>
                </div>
                <div className="stat-card" style={{'--card-color': '#ffc107', '--card-color-dark': '#d39e00'}}>
                    <h3 className="stat-number">{counts.assigned}</h3>
                    <p className="stat-label">Assigned</p>
                </div>
                <div className="stat-card" style={{'--card-color': '#fd7e14', '--card-color-dark': '#dc6502'}}>
                    <h3 className="stat-number">{counts.inProgress}</h3>
                    <p className="stat-label">In Progress</p>
                </div>
                <div className="stat-card" style={{'--card-color': '#28a745', '--card-color-dark': '#1e7e34'}}>
                    <h3 className="stat-number">{counts.resolved}</h3>
                    <p className="stat-label">Resolved</p>
                </div>
            </div>

            {/* Actions */}
            {userRole === 'resident' && (
                <div className="dashboard-actions">
                    <button
                        onClick={() => navigate('/create-issue')}
                        className="create-issue-button"
                    >
                        + Report New Issue
                    </button>
                </div>
            )}

            {/* Filters */}
            <div className="filters-container">
                <div className="filter-group">
                    <label className="filter-label">Status:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All</option>
                        <option value="new">New</option>
                        <option value="assigned">Assigned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Category:</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All</option>
                        <option value="sanitation">Sanitation</option>
                        <option value="water">Water</option>
                        <option value="security">Security</option>
                        <option value="electrical">Electrical</option>
                        <option value="parking">Parking</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button
                    onClick={fetchIssues}
                    className="refresh-button"
                >
                    Refresh
                </button>
            </div>

            {/* Issues List */}
            <div className="issues-section">
                <h2 className="issues-title">Issues</h2>
                {loading && <p className="loading-message">Loading issues...</p>}
                {error && <p className="error-message-dashboard">{error}</p>}
                {!loading && !error && filteredIssues.length === 0 && (
                    <div className="empty-message">
                        <p>No issues found.</p>
                        {userRole === 'resident' && (
                            <button
                                onClick={() => navigate('/create-issue')}
                                className="first-issue-button"
                            >
                                Create First Issue
                            </button>
                        )}
                    </div>
                )}
                {!loading && !error && filteredIssues.map(issue => (
                    <IssueCard key={issue._id} issue={issue} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
