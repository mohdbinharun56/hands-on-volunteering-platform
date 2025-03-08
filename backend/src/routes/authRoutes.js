import express from 'express';
import { createUser } from '../controllers/authController.js';

const router = express.Router();
// Create User
router.post('/registers-user',createUser);

export default router;

