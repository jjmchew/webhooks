SELECT 'CREATE DATABASE miniProj'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'miniProj')\gexec
\c miniProj

CREATE TABLE requests (
  id serial PRIMARY KEY,
  method varchar(7) NOT NULL,
  hostName varchar(100) NOT NULL,
  dateTimeStr timestamp DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
  requestHash varchar(17) NOT NULL,
  binHash varchar(14) NOT NULL
);

INSERT INTO requests (method, hostName, dateTimeStr, requestHash, binHash) VALUES
('TEST1', '/test', '2024-05-31 23:34:34.640026', '4c355-e31e4-e743e', '098d-f6b8-dedc'),
('TEST2', '/test', '2024-05-31 23:34:34.640026', '4c355-e31e4-e743e', '098d-f6b8-dedc');
