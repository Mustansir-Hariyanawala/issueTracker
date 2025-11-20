import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IssueCard.css';

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
      className="issue-card"
    >
      <div className="issue-card-header">
        <h3 className="issue-card-title">
          {issue.title}
        </h3>
        <p className="issue-card-description">
          {issue.description}
        </p>
      </div>

      <div className="issue-card-badges">
        <span className="badge badge-status" style={{
          backgroundColor: getStatusColor(issue.status)
        }}>
          {issue.status}
        </span>
        <span className="badge badge-priority" style={{
          backgroundColor: getPriorityColor(issue.priority)
        }}>
          {issue.priority}
        </span>
        <span className="badge badge-category">
          {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
        </span>
      </div>

      <div className="issue-card-footer">
        Created: {new Date(issue.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default IssueCard;
