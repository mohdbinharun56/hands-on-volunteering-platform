import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

// create events
router.post('/',createEvent);

router.get('/',getAllEvents);
export default router;