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
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

// ==================== ISSUE APIs ====================

export const createIssue = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/issues/create`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
      // Don't set Content-Type for FormData, browser will set it with boundary
    },
    body: formData
  });
  return response.json();
};

export const getAllIssues = async () => {
  const response = await fetch(`${API_BASE_URL}/issues`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  return response.json();
};

export const getMyIssues = async () => {
  const response = await fetch(`${API_BASE_URL}/issues/my`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  return response.json();
};

export const getIssueById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });
  return response.json();
};

export const updateIssueStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ status })
  });
  return response.json();
};

export const deleteIssue = async (id) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  });
  return response.json();
};
