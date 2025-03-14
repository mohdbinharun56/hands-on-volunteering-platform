import express from 'express';
import { getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import authenticateToken from '../middlewares/auth.js';

const router = express.Router();

// get all users
router.get('/',authenticateToken,getAllUsers);

// get user 
router.get('/:id',authenticateToken,getUser);

// update user profile

router.put('/:id',updateUser)


export default router;