import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandling from './middlewares/errorHandlers.js';
import createUserTable from './data/createUserTable.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// Routes
app.use('/',userRoutes);

// Error Handling
app.use(errorHandling);

// Create User Table
createUserTable();

// check connection DB
app.get('/',async(req,res)=>{
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("result",result.rows)
})

app.listen(port,()=>{
    console.log(`Server start on port: ${port}`);
})