import express from 'express';
import { getAllUsers, getUser } from '../controllers/userController.js';
import authenticateToken from '../middlewares/auth.js';

const router = express.Router();

// get all users
router.get('/',authenticateToken,getAllUsers);

// get user 
router.get('/:id',authenticateToken,getUser);

// signup user or create users 
// router.post('/users',createUser);

// login user
// router.post('/users/login',loginUsers);

// edit/update user profile
// router.put('/users/:id',updateUsers);

// View History
// router.get('users/history/:id',viewHistoryUsers);


export default router;