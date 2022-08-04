CREATE DATABASE questions_answers;

CREATE TABLE questions (
 question_id SERIAL PRIMARY KEY,
 product_id INT NOT NULL,
 question_body VARCHAR(1000) NOT NULL,
 question_date BIGINT NOT NULL,
 asker_name VARCHAR(255) NOT NULL ,
 asker_email VARCHAR(60) NOT NULL,
 reported BOOLEAN DEFAULT false,
 question_helpfulness INT DEFAULT 0
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
  body VARCHAR(1000) NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false NOT NULL,
  helpfulness INT DEFAULT 0 NOT NULL
);

CREATE TABLE answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INT REFERENCES answers(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL
);

COPY questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/codein92/Desktop/backend/atelierBackend/data/questions.csv'
DELIMITER ','
CSV HEADER ;

COPY answers (id, question_id, body, answer_date, answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/codein92/Desktop/backend/atelierBackend/data/answers.csv'
DELIMITER ','
CSV HEADER ;

COPY answers_photos (id, answer_id, url)
FROM '/Users/codein92/Desktop/backend/atelierBackend/data/answers_photos.csv'
DELIMITER ','
CSV HEADER ;

-- SELECT MAX(question_id) FROM questions;
-- SELECT nextval('questions_question_id_seq');
SELECT setval('questions_question_id_seq', (SELECT MAX(question_id) FROM questions)+1);
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers)+1);
SELECT setval('answers_photos_id_seq', (SELECT MAX(id) FROM answers_photos)+1);

CREATE INDEX questions_product ON questions(product_id) WHERE reported = false;
CREATE INDEX answers_question ON answers(question_id) WHERE reported = false;
CREATE INDEX photos_answer ON answers_photos(answer_id);