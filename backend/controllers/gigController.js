import Gig from '../models/gig.js';
import Bid from '../models/bid.js';

export const getGigs = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim() !== "") {
            query.title = { $regex: search, $options: 'i' };
        }

        const gigs = await Gig.find(query).sort({ createdAt: -1 });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching gigs" });
    }
};

export const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        if (!title || !description || !budget) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newGig = await Gig.create({
            title,
            description,
            budget,
            owner: req.user.id 
        });

        res.status(201).json({ status: 'success', data: newGig });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
            .populate('owner', 'name')
            .populate({
                path: 'bids',
                populate: { path: 'freelancer', select: 'name' }
            });

        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        res.status(200).json(gig);
    } catch (err) {
        console.error("🔥 CRASH ERROR:", err.message); 
        res.status(500).json({ message: "Backend Crash: " + err.message });
    }
};

export const hireFreelancer = async (req, res) => {
    try {
        const { gigId, bidId } = req.body;

        await Bid.findByIdAndUpdate(bidId, { status: 'hired' });

        await Bid.updateMany({ gig: gigId, _id: { $ne: bidId } }, { status: 'rejected' });

        const updatedGig = await Gig.findByIdAndUpdate(
            gigId, 
            { status: 'assigned' }, 
            { new: true }
        );

        console.log("Updated Gig from DB:", updatedGig);

        res.status(200).json({ status: 'success', data: updatedGig });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

