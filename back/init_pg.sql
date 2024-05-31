SELECT 'CREATE DATABASE miniProj'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'miniProj')\gexec
\c miniProj
CREATE TABLE users(
  id serial PRIMARY KEY,
  name varchar(25),
  unique_id varchar(25)
);

INSERT INTO users (name, unique_id) VALUES
('some guy', 'abcdefg'),
('another guy', '1234567');
