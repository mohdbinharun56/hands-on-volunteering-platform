import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


// check connection DB
app.get('/',async(req,res)=>{
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("result",result.rows)
})

app.listen(port,()=>{
    console.log(`Server start on port: ${port}`);
})