import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    res.send("Start")
})

app.listen(port,()=>{
    console.log(`Server start on port: ${port}`);
})