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


CREATE TABLE IF NOT EXISTS attendees(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN Key (event_id) REFERENCES events(id) ON DELETE CASCADE   
)

CREATE TABLE IF NOT EXISTS helpPosts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    posted_by INT NOT NULL,
    urgency VARCHAR(10) CHECK(urgency IN ("Low","Medium", "Urgent")) NOT NULL,
    status VARCHAR(10) CHECK(status IN ("Open","Close")) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) On DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    message_by INT NOT NULL,
    posted_id INT NOT NULL,
    FOREIGN KEY (message_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (posted_id) REFERENCES helpPosts(id) ON DELETE CASCADE
)