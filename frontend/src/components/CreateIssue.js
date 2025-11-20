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
            // TEMPORARY: Comment out API call for testing without backend
            /*
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
            */

            // TEMPORARY: Simulate successful issue creation
            alert('Issue created successfully!');
            navigate('/dashboard');
            
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Create issue error:', err);
        } finally {
            setLoading(false);
        }
    };  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Brief description of the issue"
            style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Detailed description of the issue"
            style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Priority *
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Upload Image/Video (Optional)
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {mediaFile && (
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Selected: {mediaFile.name}
            </p>
          )}
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssue;
