import pool from "../config/db.js";



export const getCommentService= async(id)=>{
    const  result = await pool.query("SELECT users.name, users.email,comments.message from comments JOIN users ON comments.message_by = users.id JOIN helpposts ON comments.post_id = helpposts.id WHERE comments.post_id = $1",[id]);
    return result;
}


export const postCommentsService = async(postComment)=>{
    const {message,message_by,post_id} = postComment;
    const result = await pool.query("INSERT INTO comments (message,message_by,post_id) VALUES ($1,$2,$3) RETURNING * ",[message,message_by,post_id]);
    return result;
}