import pool from "../config/db.js"

const createCommentsTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    message_by INT NOT NULL,
    posted_id INT NOT NULL,
    FOREIGN KEY (message_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (posted_id) REFERENCES helpPosts(id) ON DELETE CASCADE
)`
    try {
        pool.query(queryText);
        console.log("Create Comments Table")
    }
    catch (error) {
        console.log("error to create comments table", error)
    }
}

export default createCommentsTable;