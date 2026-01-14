
import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }] ,
    status: { 
        type: String, 
        enum: ['open', 'assigned', 'completed'], 
        default: 'open'
    }
}, { timestamps: true });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;