import React from 'react';
import API from '../api/instance';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  
const handleLogout = async () => {
  try {
    
    await API.post('http://localhost:5000/api/auth/logout'); 

    localStorage.removeItem('user');
    alert("Logged out successfully!");
    navigate('/login');
    window.location.reload(); 
  } catch (err) {
    console.error("Logout failed path:", err.config.url); 
    alert("Error during logout.");
  }
};

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
    >
      Logout
    </button>
  );
};

export default Logout;