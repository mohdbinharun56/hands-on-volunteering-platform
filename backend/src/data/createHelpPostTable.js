import pool from "../config/db.js"


const createHelpPost = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS helpPosts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    posted_by INT NOT NULL,
    urgency VARCHAR(10) CHECK(urgency IN ('Low','Medium', 'Urgent')) NOT NULL,
    status VARCHAR(10) CHECK(status IN ('Open','Close')) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) On DELETE CASCADE
)`

    try {
        pool.query(queryText);
        console.log("Create helpPost Table");
    } catch (error) {
        console.log("Error", error)
    }
}

export default createHelpPost;