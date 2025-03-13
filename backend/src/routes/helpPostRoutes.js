import express from 'express';
import { getPost, helpPost } from '../controllers/helpPostController.js';

const router = express.Router();

router.get('/',getPost);
router.post('/',helpPost);

export default router;