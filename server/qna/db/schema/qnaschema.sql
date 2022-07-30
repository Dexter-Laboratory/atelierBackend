
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
  question_id INT REFERENCES questions(id),
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpful INT DEFAULT 0 NOT NULL
);

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  id INT PRIMARY KEY,
  answer_id INT REFERENCES answers(id),
  url VARCHAR(255)
);


-- psql -U codein92 -d qna -a -f server/qna/db/schema/qschema.sql

-- copy answers from 'path' DELIMITER ',' CSV HEADER ; COPY to temp first and insert into the table for foreign key
INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
SELECT answers_temp.id, answers_temp.question_id, answers_temp.body, answers_temp.date_written, answers_temp.answerer_name, answers_temp.answerer_email, answers_temp.reported, answers_temp.helpful
FROM answers_temp inner join questions on answers_temp.question_id = questions.id;

-- copy answers_photos from  DELIMITER ',' CSV HEADER ;

INSERT INTO answers_photos (id, answer_id, url)
SELECT answers_photos_temp .id, answers_photos_temp.answer_id, answers_photos_temp.url
FROM answers_photos_temp inner join answers on answers_photos_temp.answer_id = answers.id;

-- CREATE INDEXES//
CREATE INDEX noreport_answers ON answers(reported) WHERE reported = false;
CREATE INDEX noreport_questions ON questions(reported) WHERE reported = false;


CREATE INDEX photos ON answers_photos(answer_id);
CREATE INDEX answers_questions ON answers(question_id);

ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN date_written TO question_date;
ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness;
ALTER TABLE answers RENAME COLUMN body TO answer_body;
ALTER TABLE answers RENAME COLUMN date_written TO answer_date;
ALTER TABLE answers RENAME COLUMN helpful TO answers_helpfulness;

CREATE INDEX answers_questions ON answers(question_id) WHERE reported = false;
CREATE INDEX photos_answers ON answers_photos(answer_id);
CREATE INDEX questions_product ON questions(product_id) WHERE reported = false;


INSERT INTO questions(id, product_id, question_body, question_date, asker_name, asker_email)
  VALUES (3518963 + 1, 40351, 'hello my name is test', 1659211980105,  'test',  'test@test.com')
    RETURNING *;
