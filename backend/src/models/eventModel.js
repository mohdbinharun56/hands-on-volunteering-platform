import pool from "../config/db.js";



export const getAllEventService = async () => {
    const result = await pool.query("SELECT * FROM events");
    return result.rows;
}
export const createEventService = async (newEvent) => {
    const { title, description, date, location, category, user_id } = newEvent;
    const result = await pool.query("INSERT INTO events (title, description, Date, location, category , user_id) VALUES ($1,$2,$3,$4,$5,$6)", [title, description, date, location, category, user_id]);
    return result.rows;
}


export const updateEventService = async(id,updateEvent)=>{
    const {title, description, date, location, category} = updateEvent;
    const isExistId = await pool.query("SELECT * from events where id = $1 ", [id]);
    if(isExistId.rowCount<1){
        throw new Error("ID is not found");
    }
    const result = await pool.query("UPDATE events SET title = $1, description=$2, date=$3, location=$4, category=$5 WHERE id=$6",[title, description, date, location, category,id]);
    return result;
}


export const deleteEventService = async(id)=>{
    const isExistId = await pool.query("SELECT * FROM events where id=$1",[id]);
    if(isExistId.rowCount<1){
        throw new Error("ID is not found");
    }
    const result = await pool.query("DELETE FROM events where id=$1",[id]);
    return result;
}