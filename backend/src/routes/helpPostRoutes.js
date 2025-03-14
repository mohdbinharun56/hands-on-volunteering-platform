import express from 'express';
import { getPost, getPostByID, helpPost } from '../controllers/helpPostController.js';

const router = express.Router();

router.get('/',getPost);
router.get('/:id',getPostByID)
router.post('/',helpPost);

export default router;