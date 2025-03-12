import pool from "../config/db.js"
import handleResponse from "../controllers/handleResponse.js";

export const attendeeListService = async (res, list) => {
    const { user_id, event_id } = list;
    console.log("from Module:", user_id, event_id);
    const isEventExist = await pool.query("SELECT * from events where id=$1", [event_id]);
    if (!isEventExist) {
        return handleResponse(res, 400, "This event does not exist");
    }

    // const attendees = await pool.query("SELECT * FROM attendees where user_id=$1 and event_id=$2",[user_id,event_id]);
    // console.log("attendees is:",attendees);
    // if(attendees){
    //     return handleResponse(res,400,"This user already register in the same Events before");
    // }
    // const result = await pool.query("INSERT INTO attendees (user_id,event_id) VALUES ($1,$2) RETURNING *",[user_id,event_id]);
    const result = await pool.query(`INSERT INTO attendees (user_id, event_id)
         SELECT $1, $2
         WHERE NOT EXISTS (
            SELECT 1 FROM attendees WHERE user_id = $1 AND event_id = $2
         )
         RETURNING *;`,
        [user_id, event_id]);
    return result.rows;
}