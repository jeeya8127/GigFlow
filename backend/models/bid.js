
import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    message: { type: String, required: true },
    gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'hired', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);