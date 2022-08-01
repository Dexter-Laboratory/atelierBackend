const db = require("../db");

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { product_id, page = 1, count = 5 } = req.query;
      const qnaQuery = `
        SELECT 40330 AS product_id,
          json_agg(
            json_build_object(
              'question_id', questions.question_id,
              'question_body', questions.question_body,
              'question_date', questions.question_date,
              'asker_name', questions.asker_name,
              'question_helpfulness', questions.question_helpfulness,
              'reported', questions.reported,
              'answers', (SELECT coalesce((
                json_object_agg(
                  answers.id, json_build_object(
                    'id', answers.id,
                    'body', answers.body,
                    'date', answers.answer_date,
                    'answerer_name', answers.answerer_name,
                    'helpfulness', answers.helpfulness,
                    'photos', (SELECT coalesce(json_agg(answers_photos.url), '[]')
                    FROM answers_photos WHERE answers_photos.answer_id = answers.id
                    )
                  )
                )
              ), '{}')
              FROM answers WHERE answers.question_id = questions.question_id
              )
            )
          ) AS results
        FROM questions
        WHERE questions.product_id = 40350 AND questions.reported = false
        OFFSET ${(page - 1) * count}
        LIMIT ${count}
        GROUP BY 1
      ;
      `;
      const [data] = await db.query(qnaQuery);
      res.status(200).json(data);
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
          coalesce(json_agg(
            json_build_object(
              'answer_id', answers.id,
              'body', answers.body,
              'date', answers.answer_date,
              'answerer_name', answers.answerer_name,
              'helpfulness', answers.helpfulness,
              'photos', (SELECT coalesce(json_agg(
                json_build_object(
                  'id', answers_photos.id,
                  'url', answers_photos.url
                )), '[]')
                FROM answers_photos WHERE answers_photos.answer_id = answers.id
              )
            )
          ), '[]') AS results
        FROM answers
        WHERE answers.question_id = ${question_id} and answers.reported = false
        OFFSET ${(page - 1) * count}
        LIMIT ${count}
        ;
    `;
      const [data] = await db.query(aQuery);
      res.status(200).json(data);
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
        RETURNING *
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
      const postAnswerQuery = () => `
        INSERT INTO answers(question_id, answer_body, answer_date, answerer_name, answerer_email)
        VALUES(${question_id}, '${body}', ${+new Date()}, '${name}', '${email}')
        RETURNING *
      `;
      const postAnswersPhotosQuery = (photo) => `
        INSERT INTO answers_photos(answer_id, url)
        VALUES(${nextAnswerId}, '${photo}')
        RETURNING *
      `;
      const print2 = await db.query(postAnswerQuery);
      const print1 = await Promise.all(
        photos.map((photo) => postAnswersPhotosQuery(photo))
      );
      nextAnswerId++;
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  addQuestionHelpful: async (req, res) => {
    try {
      const { question_id } = req.params;
      const addHelpfulMutationStr = `
        UPDATE questions
        SET question_helpfulness = question_helpfulness + 1
        WHERE id=${question_id}
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
        WHERE id=${question_id}
      `;
      await db.query(reportedQuestionMutationStr);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};
