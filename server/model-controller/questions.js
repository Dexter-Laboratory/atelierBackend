const db = require("../db");

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { product_id, page = 1, count = 5 } = req.query;
      const qnaQuery = `
        SELECT questions.product_id,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'question_id', questions.question_id,
              'question_body', questions.question_body,
              'question_date', (SELECT TO_CHAR(to_timestamp(questions.question_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS:000"Z"')),
              'asker_name', questions.asker_name,
              'question_helpfulness', questions.question_helpfulness,
              'reported', questions.reported,
              'answers', (SELECT COALESCE((
                JSON_OBJECT_AGG(
                  answers.id, JSON_BUILD_OBJECT(
                    'id', answers.id,
                    'body', answers.body,
                    'date', (SELECT TO_CHAR(to_timestamp(answers.answer_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS:000"Z"')),
                    'answerer_name', answers.answerer_name,
                    'helpfulness', answers.helpfulness,
                    'photos', (SELECT COALESCE(JSON_AGG(answers_photos.url), '[]')
                    FROM answers_photos WHERE answers_photos.answer_id = answers.id
                    )
                  )
                )
              ), '{}')
              FROM answers WHERE answers.question_id = questions.question_id AND answers.reported = false
              )
            )
          ) AS results
        FROM questions
        WHERE questions.product_id = ${product_id} AND questions.reported = false
        GROUP BY 1
        OFFSET ${(+page - 1) * +count}
        LIMIT ${+count};
      `;
      const [data] = await db.query(qnaQuery);
      res.send(data);
      // const success = cache.set(key, body, 10000);
      // console.log("caching success: " + success);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  getAnswers: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { page = 1, count = 5 } = req.query;
      const aQuery = `
        SELECT ${question_id} AS question,
          ${page} AS page,
          ${count} AS count,
          COALESCE(JSON_AGG(
            JSON_BUILD_OBJECT(
              'answer_id', answers.id,
              'body', answers.body,
              'date', (SELECT TO_CHAR(to_timestamp(answers.answer_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS:000"Z"')),
              'answerer_name', answers.answerer_name,
              'helpfulness', answers.helpfulness,
              'photos', (SELECT COALESCE(JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', answers_photos.id,
                  'url', answers_photos.url
                )), '[]')
                FROM answers_photos WHERE answers_photos.answer_id = answers.id
              )
            )
          ), '[]') AS results
        FROM answers
        WHERE answers.question_id = ${question_id} and answers.reported = false
        OFFSET ${(+page - 1) * +count}
        LIMIT ${+count};
      `;
      const [data] = await db.query(aQuery);
      res.send(data);
      // const success = cache.set(key, body, 10000);
      // console.log("caching success: " + success);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  postQuestion: async (req, res) => {
    try {
      const { body, name, email, product_id } = req.body;
      const postQuestionQueryStr = `
        INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email)
        VALUES (${product_id}, '${body}', ${+new Date()}, '${name}', '${email}')
      `;
      await db.query(postQuestionQueryStr);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  postAnswer: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { body, name, email, photos } = req.body;

      const postAnswerQuery = `
        START TRANSACTION;
        INSERT INTO answers(question_id, body, answer_date, answerer_name, answerer_email)
        VALUES(${question_id}, '${body}', ${+new Date()}, '${name}', '${email}')
        RETURNING *;
      `;

      const postPhotoQuery = (answer_id) => `
        INSERT INTO answers_photos(answer_id, url)
        VALUES(${answer_id}, '${photos}')
        RETURNING *;
        COMMIT;
      `;
      const [answer] = await db.query(postAnswerQuery);
      await db.query(postPhotoQuery(answer.id));

      res.sendStatus(201);
    } catch (err) {
      await db.query("ROLLBACK;");
      res.sendStatus(404);
    }
  },

  addQuestionHelpful: async (req, res) => {
    try {
      const { question_id } = req.params;
      const addHelpfulMutationStr = `
        UPDATE questions
        SET question_helpfulness = question_helpfulness + 1
        WHERE question_id=${question_id}
        ;
      `;
      await db.query(addHelpfulMutationStr);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  reportQuestion: async (req, res) => {
    try {
      const { question_id } = req.params;
      const reportedQuestionMutationStr = `
        UPDATE questions
        SET reported = true
        WHERE question_id=${question_id}
        ;
      `;
      await db.query(reportedQuestionMutationStr);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },
};
