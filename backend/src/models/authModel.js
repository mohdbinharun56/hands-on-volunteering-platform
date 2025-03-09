import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

export const createUserService = async (user) => {
    const { name, email, password, skills, causes } = user;
    const bycriptPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users (name,email,password_hash,skills,causes) 
        VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [name, email, bycriptPassword, skills, causes]
    );
    return result.rows;
}

// Signin user 
export const signInUserService = async (userCredentials) => {
    const { email, password } = userCredentials;
    const isUserExist = await pool.query("SELECT * FROM users where email=$1", [email]);
    // console.log(isUserExist.rows.length);
    if (isUserExist.rows.length === 0) {
        // Incorrect user credentials 
        throw new Error("Invalid user credentials!");
    }

    const user = isUserExist.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        // Incorrect user credentials
        throw new Error("Invalid user credentials!");
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1d" });

    const {password_hash,...restUser} = user;
    return {
        user: restUser,
        token
    }
}