import pool from "../config/db.js"
import handleResponse from "../controllers/handleResponse.js";


export const getHistoryService = async (res, id) => {
    try {
        const isUserHistory = await pool.query("SELECT * from attendees where user_id=$1", [id]);
        // console.log(result);
        if (isUserHistory.rowCount < 1) {
            // throw new Error("this user has no History yet");
            return handleResponse(res, 400, "user not have any History");
        }
        const result = await pool.query("SELECT attendees.id,users.name,users.email,events.title,attendees.event_id from attendees JOIN users ON attendees.user_id = users.id JOIN events ON attendees.event_id = events.id where attendees.user_id=$1", [id]);
        // console.log(result.rows)
        return result.rows;
    }catch(error){
        return handleResponse(res, 400, "user not have any History");        
    }
}


export const deleteHistoryService = async (res, userId, eventId) => {
    const isExist = await pool.query("SELECT * FROM attendees where user_id=$1 and event_id=$2", [userId, eventId]);
    console.log("from module", isExist);
    if (isExist.rowCount < 1) {
        return handleResponse(res, 401, "Not exist in list");
    }
    // console.log(isExist.rows[0].id);
    const result = await pool.query("DELETE FROM attendees where id=$1", [isExist.rows[0].id]);
    // console.log(result);
    return result;

}