import express from 'express';
import { getComment, postComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/:id',getComment);
router.post('/',postComment);

export default router;