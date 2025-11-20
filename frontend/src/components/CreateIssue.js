import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '../services/api';

const CreateIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'sanitation',
    priority: 'Low'
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['sanitation', 'water', 'security', 'electrical', 'parking', 'other'];
  const priorities = ['Low', 'Medium', 'High'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('priority', formData.priority);
            
            if (mediaFile) {
                formDataToSend.append('media', mediaFile);
            }

            const response = await createIssue(formDataToSend);

            if (response.success || response._id) {
                alert('Issue created successfully!');
                navigate('/dashboard');
            } else {
                setError(response.message || 'Failed to create issue');
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
            console.error('Create issue error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-issue-container">
            <div className="create-issue-card">
                <h2 className="create-issue-title">Report an Issue</h2>
                <form onSubmit={handleSubmit} className="create-issue-form">
                    <div className="form-group">
                        <label className="form-label">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Brief description of the issue"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Detailed description of the issue"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Priority *
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Attach Image/Video (Optional)
                        </label>
                        <input
                            type="file"
                            name="media"
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            className="file-input"
                        />
                        {mediaFile && <p className="file-name">Selected: {mediaFile.name}</p>}
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Submitting...' : 'Submit Issue'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/dashboard')}
                            className="btn-cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateIssue;
