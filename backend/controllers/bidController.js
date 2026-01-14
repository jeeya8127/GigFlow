import Bid from '../models/bid.js';
import Gig from '../models/gig.js';

export const submitBid = async (req, res) => {
    try {
        const { gigId, amount, message } = req.body;

        const newBid = await Bid.create({
            gig: gigId,
            freelancer: req.user.id,
            amount,
            message,
            status: 'pending'
        });

        await Gig.findByIdAndUpdate(gigId, { $push: { bids: newBid._id } });

        res.status(201).json({ status: 'success', data: newBid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBidsByGig = async (req, res) => {
    try {
        const { gigId } = req.params;
        const gig = await Gig.findById(gigId);

        if (String(gig.owner) !== String(req.user.id)) {
            return res.status(403).json({ message: "Not authorized to view bids" });
        }

        const bids = await Bid.find({ gig: gigId }).populate('freelancer', 'name');
        res.status(200).json({ status: 'success', data: bids });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const hireFreelancer = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { gigId } = req.body;

        await Bid.findByIdAndUpdate(bidId, { status: 'hired' });

        await Bid.updateMany(
            { gig: gigId, _id: { $ne: bidId } }, 
            { status: 'rejected' }
        );

        const updatedGig = await Gig.findByIdAndUpdate(
            gigId, 
            { status: 'assigned' }, 
            { new: true }
        );

        res.status(200).json({ 
            status: 'success', 
            message: "Hired! Other bids rejected and gig assigned.",
            data: updatedGig 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
