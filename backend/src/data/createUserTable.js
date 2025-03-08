import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    volunteer_hours INT DEFAULT 0,
    role VARCHAR(50) DEFAULT 'volunteer',
    skills TEXT[] NOT NULL,
    causes TEXT[] NOT NULL
);`

    try {
        pool.query(queryText);
        console.log("User table created if not exists");
    } catch (error) {
        console.log("Error creating users: ", error);
    }
}

export default createUserTable;