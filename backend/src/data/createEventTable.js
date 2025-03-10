import pool from '../config/db.js';


const createEvents = async () => {
    const queryText = `
    CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(200) NOT NULL,
    Date TIMESTAMP NOT NULL,
    location VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'education' or 'environment'
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);`

    try {
        pool.query(queryText);
        console.log("Events Table Created");
    } catch (error) {
        console.log("Error while creating events table: ", error);
    }
}
export default createEvents;