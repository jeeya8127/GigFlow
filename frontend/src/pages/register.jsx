import React, { useState } from 'react';
import API from '../api/instance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', user);
      alert("Registration Successful! Now Login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUser({...user, name: e.target.value})} required />
        <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUser({...user, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUser({...user, password: e.target.value})} required />
        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">Register</button>
      </form>
    </div>
  );
};

export default Register;