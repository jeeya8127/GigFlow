import React, { useState } from 'react';
import API from '../api/instance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', creds);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      alert(`Welcome back, ${data.user.name}!`);
      navigate('/');
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCreds({...creds, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCreds({...creds, password: e.target.value})} required />
        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
};

export default Login;