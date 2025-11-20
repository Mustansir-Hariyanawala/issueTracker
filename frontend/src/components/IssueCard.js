import React from 'react';
import { useNavigate } from 'react-router-dom';

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
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

  return (
    <div 
      onClick={() => navigate(`/issue/${issue._id}`)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        cursor: 'pointer',
        backgroundColor: 'white',
        transition: 'box-shadow 0.2s',
        ':hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#212529' }}>
          {issue.title}
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          color: '#6c757d',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {issue.description}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <span style={{
          padding: '4px 10px',
          backgroundColor: getStatusColor(issue.status),
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {issue.status}
        </span>
        <span style={{
          padding: '4px 10px',
          backgroundColor: getPriorityColor(issue.priority),
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {issue.priority}
        </span>
        <span style={{
          padding: '4px 10px',
          backgroundColor: '#e9ecef',
          color: '#495057',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
        </span>
      </div>

      <div style={{ fontSize: '12px', color: '#6c757d' }}>
        Created: {new Date(issue.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default IssueCard;
