import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssueById, updateIssueStatus } from '../services/api';

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
        try {
            // TEMPORARY: Comment out API call for testing without backend
            /*
            const data = await getIssueById(id);
            if (data._id) {
                setIssue(data);
                setNewStatus(data.status);
            } else {
                setError('Issue not found');
            }
            */

            // TEMPORARY: Use mock data for testing
            const mockIssue = {
                _id: id,
                title: 'Sample Issue',
                description: 'This is a sample issue for testing purposes.',
                category: 'sanitation',
                priority: 'Medium',
                status: 'New',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: {
                    name: 'Test User'
                }
            };
            setIssue(mockIssue);
            setNewStatus(mockIssue.status);
            
        } catch (err) {
            setError('Failed to load issue details');
            console.error('Fetch issue error:', err);
        } finally {
            setLoading(false);
        }
    };    const handleStatusUpdate = async () => {
        setUpdating(true);
        try {
            // TEMPORARY: Comment out API call for testing without backend
            /*
            const response = await updateIssueStatus(id, newStatus);
            if (response.success || response._id) {
                alert('Status updated successfully!');
                fetchIssueDetails();
            } else {
                alert('Failed to update status');
            }
            */

            // TEMPORARY: Simulate successful status update
            alert('Status updated successfully!');
            setIssue({ ...issue, status: newStatus });
            
        } catch (err) {
            alert('Error updating status');
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
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ 
          padding: '8px 16px', 
          marginBottom: '20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>{issue.title}</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ 
              padding: '5px 12px', 
              backgroundColor: getStatusColor(issue.status),
              color: 'white',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {issue.status}
            </span>
            <span style={{ 
              padding: '5px 12px', 
              backgroundColor: getPriorityColor(issue.priority),
              color: 'white',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {issue.priority} Priority
            </span>
            <span style={{ 
              padding: '5px 12px', 
              backgroundColor: '#e9ecef',
              color: '#495057',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#495057' }}>Description</h4>
          <p style={{ lineHeight: '1.6', color: '#212529' }}>{issue.description}</p>
        </div>

        {issue.media && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', color: '#495057' }}>Attached Media</h4>
            {issue.media.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img 
                src={`http://localhost:3000${issue.media}`} 
                alt="Issue" 
                style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            ) : (
              <video 
                controls 
                style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <source src={`http://localhost:3000${issue.media}`} />
              </video>
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#495057' }}>Issue Details</h4>
          <p><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(issue.updatedAt).toLocaleString()}</p>
          {issue.createdBy && <p><strong>Reported By:</strong> {issue.createdBy.name || 'Resident'}</p>}
        </div>

        {userRole === 'admin' && (
          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h4 style={{ marginBottom: '15px' }}>Update Status (Admin Only)</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '14px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === issue.status}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: updating || newStatus === issue.status ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: updating || newStatus === issue.status ? 'not-allowed' : 'pointer'
                }}
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
