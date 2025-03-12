import express from 'express';
import { deleteHistory, getHistory } from '../controllers/historyController.js';

const router = express.Router();

router.get('/:id',getHistory);
router.delete('/:userid/:eventid',deleteHistory);

export default router;