CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    volunteer_hours INT DEFAULT 0,
    role VARCHAR(50) DEFAULT 'volunteer', -- 'admin' or 'volunteer'
    skills TEXT[] NOT NULL,
    causes TEXT[] NOT NULL, 
);