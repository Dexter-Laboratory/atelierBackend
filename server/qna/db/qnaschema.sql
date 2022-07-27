Create SCHEMA qnaschema;

GO

CREATE TABLE questions (
 question_id: INT PRIMARY KEY,
 product_id: INT NOT NULL,
 question_body: VARCHAR(),
 question_date: VARCHAR(),
 asker_name: VARCHAR(),
 asker_email: VARCHAR(),
 question_helpfulness: INT DEFAULT 0,
 reported: INT DEFAULT 0,
);

CREATE TABLE answers (
  answer_id: INT PRIMARY KEY,
  body: VARCHAR(),
  answer_date: VARCHAR(),
  answerer_name: VARCHAR(),
  answerer_email: VARCHAR(),
  helpfulness: INT DEFAULT 0,
  reported: INT DEFAULT 0,
  photos_url: VARCHAR(),
  question_id: INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- TODO:
-- Find out varchar on answers and questions
-- Find the format of dates
-- Is date being sent from the user? or created time
--photos_url will be stringified array