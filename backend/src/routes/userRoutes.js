import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// get all users
router.get('/users',getAllUsers);

// signup user or create users 
// router.post('/users',createUser);

// login user
// router.post('/users/login',loginUsers);

// edit/update user profile
// router.put('/users/:id',updateUsers);

// View History
// router.get('users/history/:id',viewHistoryUsers);


export default router;