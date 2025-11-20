import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssueById, updateIssueStatus } from '../services/api';
import './IssueDetails.css';

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const userRole = localStorage.getItem('userRole');
  const statuses = ['New', 'Assigned', 'In Progress', 'Resolved'];

  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

    const fetchIssueDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getIssueById(id);
            if (data._id) {
                setIssue(data);
                setNewStatus(data.status);
            } else {
                setError('Issue not found');
            }
        } catch (err) {
            setError(err.message || 'Failed to load issue details');
            console.error('Fetch issue error:', err);
        } finally {
            setLoading(false);
        }
    };    const handleStatusUpdate = async () => {
        setUpdating(true);
        try {
            const response = await updateIssueStatus(id, newStatus);
            if (response.success || response._id) {
                alert('Status updated successfully!');
                fetchIssueDetails();
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            alert(err.message || 'Error updating status');
            console.error('Update status error:', err);
        } finally {
            setUpdating(false);
        }
    };  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return '#007bff';
      case 'Assigned': return '#ffc107';
      case 'In Progress': return '#17a2b8';
      case 'Resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button onClick={() => navigate('/dashboard')} className="error-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="issue-details-container">
      <button 
        onClick={() => navigate('/dashboard')}
        className="back-button"
      >
        Back to Dashboard
      </button>

      <div className="issue-details-card">
        <div className="issue-header">
          <h2 className="issue-title-detail">{issue.title}</h2>
          <div className="issue-badges">
            <span className="badge" style={{ 
              backgroundColor: getStatusColor(issue.status)
            }}>
              {issue.status}
            </span>
            <span className="badge" style={{ 
              backgroundColor: getPriorityColor(issue.priority)
            }}>
              {issue.priority} Priority
            </span>
            <span className="badge" style={{ 
              backgroundColor: '#e9ecef',
              color: '#495057'
            }}>
              {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
            </span>
          </div>
        </div>

        <div className="section">
          <h4 className="section-title">Description</h4>
          <p className="section-content">{issue.description}</p>
        </div>

        {issue.media && (
          <div className="media-container">
            <h4 className="section-title">Attached Media</h4>
            {issue.media.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img 
                src={`http://localhost:3000${issue.media}`} 
                alt="Issue" 
                className="issue-image"
              />
            ) : (
              <video 
                controls 
                className="issue-video"
              >
                <source src={`http://localhost:3000${issue.media}`} />
              </video>
            )}
          </div>
        )}

        <div className="issue-info">
          <h4 className="section-title">Issue Details</h4>
          <p><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(issue.updatedAt).toLocaleString()}</p>
          {issue.createdBy && <p><strong>Reported By:</strong> {issue.createdBy.name || 'Resident'}</p>}
        </div>

        {userRole === 'admin' && (
          <div className="admin-panel">
            <h4 className="admin-panel-title">Update Status (Admin Only)</h4>
            <div className="status-update-form">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === issue.status}
                className="update-button"
              >
                {updating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetails;
