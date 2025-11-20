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

    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            // TEMPORARY: Comment out API call for testing without backend
            /*
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
            */

            // TEMPORARY: Use mock data for testing
            const mockIssues = [
                {
                    _id: '1',
                    title: 'Broken Elevator in Building A',
                    description: 'The elevator has been stuck on the 3rd floor for 2 days',
                    category: 'electrical',
                    priority: 'High',
                    status: 'New',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    _id: '2',
                    title: 'Water Leakage in Parking',
                    description: 'Water is leaking from the ceiling in parking lot B2',
                    category: 'water',
                    priority: 'Medium',
                    status: 'In Progress',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    _id: '3',
                    title: 'Overflowing Garbage Bins',
                    description: 'Garbage bins near gate 2 are overflowing',
                    category: 'sanitation',
                    priority: 'Low',
                    status: 'Resolved',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            setIssues(mockIssues);
            
        } catch (err) {
            setError('Failed to load issues');
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
        <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ marginBottom: '10px' }}>
                    {userRole === 'admin' ? 'Admin Dashboard' : 
                     userRole === 'technician' ? 'Technician Dashboard' : 
                     'My Issues'}
                </h1>
                <p style={{ color: '#6c757d' }}>
                    Welcome, {userName || 'User'}!
                </p>
            </div>

            {/* Statistics Cards */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '15px', 
                marginBottom: '30px' 
            }}>
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{counts.total}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Total Issues</p>
                </div>
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#17a2b8', 
                    color: 'white', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{counts.new}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>New</p>
                </div>
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#ffc107', 
                    color: 'white', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{counts.assigned}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Assigned</p>
                </div>
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#fd7e14', 
                    color: 'white', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{counts.inProgress}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>In Progress</p>
                </div>
                <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{counts.resolved}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Resolved</p>
                </div>
            </div>

            {/* Actions */}
            {userRole === 'resident' && (
                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/create-issue')}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        + Report New Issue
                    </button>
                </div>
            )}

            {/* Filters */}
            <div style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <div>
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Status:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="all">All</option>
                        <option value="new">New</option>
                        <option value="assigned">Assigned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div>
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Category:</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
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
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: 'auto'
                    }}
                >
                    Refresh
                </button>
            </div>

            {/* Issues List */}
            <div>
                <h3 style={{ marginBottom: '15px' }}>
                    {filter === 'all' ? 'All Issues' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Issues`}
                    {' '}({filteredIssues.length})
                </h3>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                        Loading issues...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#dc3545' }}>
                        {error}
                    </div>
                ) : filteredIssues.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                        No issues found.
                        {userRole === 'resident' && (
                            <div style={{ marginTop: '10px' }}>
                                <button
                                    onClick={() => navigate('/create-issue')}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Report Your First Issue
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    filteredIssues.map(issue => (
                        <IssueCard key={issue._id} issue={issue} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;
