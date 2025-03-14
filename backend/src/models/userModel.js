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
export const updateUserService = async(id,updateProfile)=>{
    const {name,skills,causes,volunteer_hours} = updateProfile;
    const isExist = await pool.query("SELECT * from users where id=$1",[id]);
    if(isExist.rowCount<1){
        throw new Error("id is not Found");
    }
    const result = await pool.query("UPDATE users SET name=$1, volunteer_hours=$2, skills=$3::text[], causes=$4::text[] WHERE id = $5",[name,volunteer_hours,skills,causes,id]);
    return result;
}
