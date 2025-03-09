import pool from "../config/db.js";

// to fetch all user data
export const getAllUserService = async()=>{
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

// get user 
export const getUserService = async(id)=>{
    const result = await pool.query("SELECT * from users where id=$1",[id]);
    return result.rows;
}
// update user profile
// export const updateUsersService = async()
