import pool from "../config/db.js";

export const postCommentsService = async(postComment)=>{
    const {message,message_by,post_by} = postComment;
    const result = await pool.query("INSERT INTO comments (message,message_by,post_by) VALUES ($1,$2,$3) RETURNING * ",[message,message_by,post_by]);
    return result;
}