import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import pool from './config/db.js';

import errorHandling from './middlewares/errorHandlers.js';

import createUserTable from './data/createUserTable.js';
import createEvents from './data/createEventTable.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from'./routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

// Routes
app.use('/users',userRoutes);
app.use('/users',authRoutes);
app.use('/events',eventRoutes);
// Error Handling
app.use(errorHandling);

// Create User Table
createUserTable();
// Create Events Table
createEvents();

// check connection DB
app.get('/',async(req,res)=>{
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    // console.log("result",result.rows);
    res.send(result.rows[0]);
})

app.listen(port,()=>{
    console.log(`Server start on port: ${port}`);
})