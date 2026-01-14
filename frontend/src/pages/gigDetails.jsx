import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GigDetails = () => {
    const { gigId } = useParams();
    const navigate = useNavigate();
    const [gig, setGig] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [proposal, setProposal] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const [loading, setLoading] = useState(false);
    
    const loggedInUser = JSON.parse(localStorage.getItem('user')); 

    useEffect(() => {
        const fetchGigDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
                setGig(res.data);
            } catch (err) { console.error(err); }
        };
        fetchGigDetails();
    }, [gigId]);

    const currentUserId = loggedInUser?._id || loggedInUser?.id;
    const gigOwnerId = gig?.owner?._id || gig?.owner;
    const isOwner = currentUserId && gigOwnerId && String(currentUserId) === String(gigOwnerId);

    useEffect(() => {
        if (gig && gig.bids && currentUserId) {
            const alreadyBid = gig.bids.some(bid => {
                const fId = bid.freelancer?._id || bid.freelancer;
                return String(fId) === String(currentUserId);
            });
            setHasSubmitted(alreadyBid);
        }
    }, [gig, currentUserId]);

   const handleHire = async (bidId) => {
        if (!window.confirm("Hire this freelancer?")) return;
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/bids/${bidId}/hire`,
                { gigId: gig._id },
                { withCredentials: true }
            );
            if (res.data.status === 'success') {
                alert("Freelancer Hired! 🎊");
                window.location.reload();
            }
        } catch (err) {
            console.error("Architecture Error Row 7:", err);
            alert("Hiring failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                `http://localhost:5000/api/bids`, 
                { gigId, amount: parseFloat(bidAmount), message: proposal }, 
                { withCredentials: true }
            );
            alert("Bid posted! 🚀");
            window.location.reload();
        } catch (error) {
            alert("Failed to post bid. Check console for 404.");
            console.error("Architecture Error Row 5:", error);
        } finally {
            setLoading(false);
        }
    };
    if (!gig) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
            <button onClick={() => navigate(-1)} className="mb-6 text-emerald-600 font-bold flex items-center gap-2">← Back</button>

            {/* GIG HEADER */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${gig.status?.toLowerCase()=== 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {gig.status?.toLowerCase()=== 'assigned' ? 'Assigned' : 'Open for Bids'}
                        </span>
                        <h1 className="text-4xl font-black mt-3 text-gray-900">{gig.title}</h1>
                    </div>
                    <div className="text-4xl font-bold text-emerald-600">${gig.budget}</div>
                </div>
                <p className="text-gray-600 text-lg mb-6">{gig.description}</p>
                <div className="flex items-center gap-3 border-t pt-6 mt-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 border">
                        {gig.owner?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">{gig.owner?.name || "Client"}</p>
                        <p className="text-xs text-gray-400">Posted on {new Date(gig.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* BIDS LIST */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">💬 Bids ({gig.bids?.length || 0})</h2>
                    <div className="space-y-4">
                        {gig.bids?.map(bid => (
                            <div key={bid._id} className={`bg-white p-6 rounded-2xl border transition-all ${bid.status === 'hired' ? 'border-emerald-500 ring-2 ring-emerald-50' : bid.status === 'rejected' ? 'opacity-50 grayscale' : 'border-gray-100 shadow-sm'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold text-gray-800">{bid.freelancer?.name}</p>
                                    <p className="font-black text-emerald-600 text-xl">${bid.amount}</p>
                                </div>
                                <p className="text-gray-600 text-sm italic mb-4">"{bid.message}"</p>
                                {isOwner && gig.status !== 'assigned' && bid.status !== 'rejected' && (
                                    <button onClick={() => handleHire(bid._id)} className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold">Hire</button>
                                )}
                                {bid.status === 'hired' && <div className="py-2 bg-emerald-100 text-emerald-700 text-center rounded-xl font-bold">Selected ✅</div>}
                                {bid.status === 'rejected' && <div className="py-2 bg-red-50 text-red-600 text-center rounded-xl font-bold">Not Selected ❌</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SIDEBAR - Form closes if assigned */}
                <div className="md:col-span-1">
                    <div className="sticky top-6">
                        {gig.status === 'assigned' ? (
                            <div className="bg-slate-800 p-8 rounded-3xl text-center text-white border border-slate-700 shadow-xl">
                                <h2 className="font-bold text-xl">Bidding Closed</h2>
                                <p className="text-slate-400 text-sm mt-2">This project has been assigned and is no longer accepting bids.</p>
                            </div>
                        ) : isOwner ? (
                            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl text-center">
                                <h2 className="font-bold text-xl">Owner View 👑</h2>
                                <p className="text-indigo-100 text-sm mt-2">Manage bids on the left.</p>
                            </div>
                        ) : !hasSubmitted ? (
                            <div className="bg-white p-8 rounded-3xl border shadow-xl">
                                <h2 className="font-black text-xl mb-6 text-gray-800">Submit Proposal 🚀</h2>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="w-full p-3 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Price" required />
                                    <textarea rows="5" value={proposal} onChange={(e) => setProposal(e.target.value)} className="w-full p-3 bg-gray-50 rounded-2xl outline-none text-sm" placeholder="Message..." required />
                                    <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200">Submit Bid</button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-emerald-600 p-8 rounded-3xl text-center text-white shadow-xl">
                                <h2 className="font-bold text-xl">Bid Submitted ✅</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigDetails;