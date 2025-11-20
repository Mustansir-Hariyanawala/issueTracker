import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from backend using token
    const fetchProfile = async () => {
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
          const data = await response.json();
          setUserInfo({
            name: data.name,
            email: data.email,
            role: data.role
          });
          setFormData({
            name: data.name,
            email: data.email
          });
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // TEMPORARY: Just update localStorage for testing
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    
    setUserInfo({
      ...userInfo,
      name: formData.name,
      email: formData.email
    });
    setIsEditing(false);
    alert('Profile updated successfully!');

    /* Uncomment when backend is ready
    const updateProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
          setUserInfo({ ...userInfo, name: data.name, email: data.email });
          setIsEditing(false);
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile');
        }
      } catch (err) {
        alert('Error updating profile');
      }
    };
    updateProfile();
    */
  };

  const handleCancel = () => {
    setFormData({ name: userInfo.name, email: userInfo.email });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return '#dc3545';
      case 'technician': return '#ffc107';
      case 'resident': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="profile-container">
      <button
        onClick={() => navigate('/dashboard')}
        className="back-button"
      >
        Back to Dashboard
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">{userInfo.name}</h2>
            <span className="role-badge">
              {userInfo.role}
            </span>
          </div>
        </div>

        <div className="profile-content">
          {!isEditing ? (
            <div className="profile-view">
              <h3 className="profile-section-title">Personal Information</h3>
              
              <div className="profile-field">
                <label className="profile-field-label">
                  Full Name
                </label>
                <p className="profile-field-value">
                  {userInfo.name}
                </p>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">
                  Email Address
                </label>
                <p className="profile-field-value">
                  {userInfo.email}
                </p>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">
                  Account Role
                </label>
                <p className="profile-field-value profile-role-capitalize">
                  {userInfo.role}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="edit-profile-button"
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit-form">
              <h3 className="profile-section-title">Edit Information</h3>
              
              <div className="form-group">
                <label className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Account Role (Read Only)
                </label>
                <div className="form-input" style={{ background: '#f0f0f0', cursor: 'not-allowed' }}>
                  {userInfo.role}
                </div>
              </div>

              <div className="form-actions">
                <button
                  onClick={handleSave}
                  className="save-button"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  ✖ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
