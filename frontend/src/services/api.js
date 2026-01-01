const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`
  };
};

// ==================== USER AUTH APIs ====================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

// ==================== ISSUE APIs ====================

export const createIssue = async (formData) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to create issue');
  }
  
  return data;
};

export const getAllIssues = async () => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to fetch issues');
  }
  
  return data;
};

export const getMyIssues = async () => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues/my`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to fetch your issues');
  }
  
  return data;
};

export const getIssueById = async (id) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to fetch issue details');
  }
  
  return data;
};

export const updateIssueStatus = async (id, status) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ status })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to update issue status');
  }
  
  return data;
};

export const deleteIssue = async (id) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to delete issue');
  }
  
  return data;
};
