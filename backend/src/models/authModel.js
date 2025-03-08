import pool from "../config/db.js";
import bcrypt from "bcryptjs";


export const createUserService = async(user) =>{
    const {name,email,password_hash,volunteer_hours,role,skills,causes} = user;
    const bycriptPassword = await bcrypt.hash(password_hash,10);
    const result = await pool.query(`
        INSERT INTO users (name,email,password_hash,skills,causes) 
        VALUES ($1,$2,$3,$4,$5)`,
        [name,email,bycriptPassword,skills,causes]);
        return result.rows;
}