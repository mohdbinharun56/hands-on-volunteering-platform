import express from 'express';
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/',getAllEvents);

// create events
router.post('/',createEvent);

router.put('/:id',updateEvent);

router.delete('/:id',deleteEvent);

export default router;