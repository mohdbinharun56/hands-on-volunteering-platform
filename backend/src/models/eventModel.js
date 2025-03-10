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

