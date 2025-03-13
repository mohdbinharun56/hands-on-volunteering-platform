import pool from "../config/db.js";



export const getPostService = async() =>{
    const result = await pool.query("SELECT * FROM helpposts");
    return result.rows;
}
export const helpPostService = async(newPost)=>{
    const {title,description,posted_by,urgency,status} = newPost;
    if(!title || !description || !posted_by || !urgency || !status){
        console.log("From HelpPostService Field is required!");
        return;
    }
    const result = await pool.query("INSERT INTO helpPosts (title,description,posted_by,urgency,status) VALUES ($1,$2,$3,$4,$5) RETURNING *",[title,description,posted_by,urgency,status]);
    if(result.rowCount<1){
        throw new Error("Does not appear the post. Please try again");
    }
    return result.rows;

}