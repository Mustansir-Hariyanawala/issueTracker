import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    // Get user info from localStorage
    const name = localStorage.getItem('userName') || 'User';
    const role = localStorage.getItem('userRole') || 'resident';
    const email = localStorage.getItem('userEmail') || 'user@example.com';

    setUserInfo({ name, email, role });
    setFormData({ name, email });
  }, []);

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
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
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

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', backgroundColor: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontWeight: 'bold'
            }}
          >
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ margin: '0 0 10px 0' }}>{userInfo.name}</h2>
          <span
            style={{
              padding: '5px 15px',
              backgroundColor: getRoleBadgeColor(userInfo.role),
              color: 'white',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {userInfo.role}
          </span>
        </div>

        {!isEditing ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                Name
              </label>
              <p style={{ margin: 0, fontSize: '16px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                {userInfo.name}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                Email
              </label>
              <p style={{ margin: 0, fontSize: '16px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                {userInfo.email}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                Role
              </label>
              <p style={{ margin: 0, fontSize: '16px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', textTransform: 'capitalize' }}>
                {userInfo.role}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                Role (Cannot be changed)
              </label>
              <input
                type="text"
                value={userInfo.role}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#e9ecef',
                  textTransform: 'capitalize'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
