import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
        Gig<span className="text-gray-800">Flow</span>
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
          Browse Gigs
        </Link>
        <Link to="/post-gig" className="text-gray-600 hover:text-blue-600 font-medium transition">
          Post a Gig
        </Link>

        <div className="ml-4 space-x-3 border-l pl-6 border-gray-300">
          <Link to="/login" className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm transition">
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;