import express from 'express';
import { submitBid, getBidsByGig, hireFreelancer } from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, submitBid);
router.get('/:gigId', protect, getBidsByGig);
router.patch('/:bidId/hire', protect, hireFreelancer);

export default router;