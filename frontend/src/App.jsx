import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from './components/navbar';
import PostGig from './pages/postGig';
import Feed from './pages/feed'; 
import Login from './pages/login';
import Register from './pages/register';
import GigDetails from './pages/gigDetails';
const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('notification', (data) => {
      alert(data.message);
    });
    return () => socket.off('notification');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/gig/:gigId" element={<GigDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;