import express from 'express';
import { createUser, signInUser } from '../controllers/authController.js';
// import authenticateToken from '../middlewares/auth.js';

const router = express.Router();
// Create User
router.post('/registers-user',createUser);

// signIn user
router.post('/signin-user',signInUser);

export default router;

