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

CREATE TABLE IF NOT EXISTS events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(200) NOT NULL,
    Date TIMESTAMP NOT NULL,
    location VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'education' or 'environment'
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);