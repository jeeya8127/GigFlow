import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostGig = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/gigs', 
                { title, description, budget }, 
                { withCredentials: true }
            );
            if(res.data.status === 'success') {
                alert("Gig Posted Successfully! 🎉");
                navigate('/');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Post fail ho gaya");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-500 p-2 rounded-lg text-white">💼</div>
                    <h2 className="text-2xl font-bold text-gray-800">Post a New Gig</h2>
                </div>
                <p className="text-gray-500 mb-8 text-sm">Describe your project and set your budget. Talented freelancers will bid on your gig.</p>

                <form onSubmit={handlePost} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">📄 Gig Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Build a responsive landing page"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your project in detail..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">💰 Budget (USD)</label>
                        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
                            placeholder="$ 500"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition" />
                        <p className="text-xs text-gray-400 mt-1">Set a fair budget to attract quality bids</p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => navigate('/feed')} className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition">Cancel</button>
                        <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition">Post Gig</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostGig;