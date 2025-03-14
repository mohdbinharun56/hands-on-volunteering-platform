import express from 'express';
import { deletePost, getPost, getPostByID, helpPost } from '../controllers/helpPostController.js';

const router = express.Router();

router.get('/',getPost);
router.get('/:id',getPostByID)
router.post('/',helpPost);
router.delete('/:id',deletePost)

export default router;