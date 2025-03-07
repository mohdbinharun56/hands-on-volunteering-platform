import pool from "../config/db.js";

// to fetch all user data
export const getAllUserService = async()=>{
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

// update user profile
// export const updateUsersService = async()
