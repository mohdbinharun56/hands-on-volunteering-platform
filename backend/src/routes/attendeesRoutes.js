import express from 'express';
import { attendeeList } from '../controllers/attnedeeListController.js';

const router = express.Router();

router.post('/',attendeeList);

export default router;