import pool from "../config/db.js"

const createAttendees = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS attendees(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN Key (event_id) REFERENCES events(id) ON DELETE CASCADE   
)`

    try {
        pool.query(queryText);
        console.log("Created Attendees Table");
    } catch (error) {
        console.log("Error", error);
    }
}

export default createAttendees;
