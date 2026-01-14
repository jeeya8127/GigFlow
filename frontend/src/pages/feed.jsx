import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Feed = () => {
    const [gigs, setGigs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchGigs = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/gigs?search=${searchTerm}`);
            setGigs(res.data);
        } catch (err) {
            console.error("Error fetching gigs", err);
        }
    };

    useEffect(() => {
        fetchGigs();
    }, [searchTerm]);

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Browse Gigs</h2>
            <input 
                type="text" 
                placeholder="Search for gigs..." 
                className="p-2 border rounded w-full mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gigs.length > 0 ? (
                    gigs.map(gig => (
                        <div key={gig._id} className="p-4 border rounded shadow-lg bg-white">
                            <h3 className="font-bold text-xl text-blue-800">{gig.title}</h3>
                            <p className="text-gray-600 my-2">{gig.description}</p>
                            <p className="text-green-600 font-bold">${gig.budget}</p>
                           <Link to={`/gig/${gig._id}`}>
    <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition font-semibold w-full">
        View Details
    </button>
</Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No gigs found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default Feed;