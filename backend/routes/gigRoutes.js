import express from 'express';
import { getGigs, createGig, getGigById } from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGigs);
router.post('/', protect, createGig);
router.get('/:id', getGigById);


export default router;