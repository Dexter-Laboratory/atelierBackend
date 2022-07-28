
DROP SCHEMA IF EXISTS qnaschema;

Create SCHEMA qnaschema;

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 id INT PRIMARY KEY,
 product_id INT NOT NULL,
 body VARCHAR(1000) NOT NULL,
 date_written BIGINT,
 asker_name VARCHAR(255) NOT NULL,
 asker_email VARCHAR(60) NOT NULL,
 reported BOOLEAN DEFAULT false,
 helpful INT DEFAULT 0 NOT NULL
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id INT PRIMARY KEY,
  question_id INT,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpful INT DEFAULT 0 NOT NULL
);

CREATE TABLE answers_photos (
  id INT PRIMARY KEY,
  answer_id INT,
  url VARCHAR(255)
);

-- psql -U codein92 -d qna -a -f server/qna/db/schema/qschema.sql

-- copy answers from 'path' DELIMITER ',' CSV HEADER ;


