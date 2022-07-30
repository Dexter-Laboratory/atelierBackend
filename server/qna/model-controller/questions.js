const db = require("../db");

let nextQuestionId;
let nextAnswerId;
let nextAnswerPhotoId;

(() => db.query(`Select id from questions order by id desc limit 1`))().then(question => {
  nextQuestionId = question[0].id + 1;
  console.log(nextQuestionId);
});

(() => db.query(`Select id from answers order by id desc limit 1`))().then(answer => {
  nextAnswerId = answer[0].id + 1;
  console.log(nextAnswerId);
});
(() => db.query(`Select id from answers_photos order by id desc limit 1`))().then(answerPhoto => {
  nextAnswerPhotoId = answerPhoto[0].id + 1;
  console.log(nextAnswerPhotoId);
});

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { product_id, page = 1, count = 5 } = req.query;

      const qetQuestionsQuery = (product_id) => `
        SELECT * FROM questions
        WHERE product_id=${product_id}
        AND reported = false
      `;

      const getAnswersQuery = (product_id) => `
        SELECT * FROM answers
        WHERE reported=false AND question_id
        IN (SELECT id FROM questions
        WHERE product_id =${product_id}
        AND reported = false)
      `;

      const getAnswersPhotosQuery = (product_id) => `
        SELECT * FROM answers_photos WHERE answer_id IN
        (SELECT id FROM answers WHERE reported=false AND question_id IN
        (SELECT id FROM questions WHERE product_id =${product_id} AND reported = false))
      `;

      const questionQueries = [qetQuestionsQuery, getAnswersQuery, getAnswersPhotosQuery];
      const qnaData = await Promise.all(
        questionQueries.map(
          (query) => db.any(query(product_id))
        )
      );
      const [qData, aData, apData] = qnaData;

      const photos = apData.reduce((allPics, photo) => {
        console.log(photo);
        allPics[photo.answer_id] = allPics[photo.answer_id] || [];
        return {
          ...allPics,
          [photo.answer_id]: [...allPics[photo.answer_id], photo.url]
        };
      }, {});

      const answers = aData.reduce((allAnswers, answer) => {
        allAnswers[answer.question_id] = allAnswers[answer.question_id] || {};
        return {
          ...allAnswers,
          [answer.question_id]: {
            ...allAnswers[answer.question_id],
            [answer.id]: {
              id: answer.id,
              body: answer.answer_body,
              date: new Date(answer.answer_date * 1000).toISOString().slice(1),
              answerer_name: answer.answerer_name.replaceAll(/[^a-zA-Z]+/g, ' ').trim(),
              helpfulness: answer.answers_helpfulness,
              photos: photos[answer.id] || [],
            },
          },
        };
      }, {});

      const questions = qData.map((question) => {
        const {
          id,
          question_body,
          question_date,
          asker_name,
          question_helpfulness,
          reported,
        } = question;

        return {
          question_id: id,
          question_body,
          question_date: new Date(question_date * 1000).toISOString().slice(1),
          asker_name: asker_name.replaceAll(/[^a-zA-Z]+/g, ' ').trim(),
          question_helpfulness,
          reported,
          answers: answers[id],
        };
      });

      const data = { product_id, results: questions };
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

      const answersQuery = (question_id) => `
        SELECT id, question_id, answer_body, answer_date, answerer_name, answerer_email
        FROM answers
        WHERE question_id = ${question_id} AND reported = false
      `;

      const answersPhotosQuery = (question_id) = `
        SELECT *
        FROM answers_photos
        WHERE answer_id IN
        (SELECT id FROM answers WHERE reported=false AND question_id = ${question_id})
      `;

      const answersQueries = [answersQuery, answersPhotosQuery];

      const [aData, apData] = Promise.all(answersQueries.map(query =>  db.query(query(question_id))));

      const answersPhoto = aData.reduce((imgObj, img) => {
        imgObj[img.answer_id] = imgObj[img.answer_id] || [];
        return {
          ...imgObj,
          [img.answer_id] : [...imgObj[img.answer_id], img.url]
        }
      }, {});
      const answers = apData.map(data => {
        return {
          answer_id: data.id,
          body: data.answer_body,
          date: new Date(data.answer_date * 1000).toISOString().slice(1),
          answerer_name: data.answerer_name.replaceAll(/[^a-zA-Z]+/g, ' ').trim(),
          helpfulness: data.answerer_helpfulness,
          photos: answersPhoto[data.id]
        }
      });

      const data = {
        question: question_id,
        page,
        count,
        results: answers
      }
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  postQuestion: async (req, res) => {
    try {
      const { body, name, email, product_id } = req.body;
      const postQuestionQueryStr = `
        INSERT INTO questions(id, product_id, question_body, question_date, asker_name, asker_email)
        VALUES (${nextQuestionId++}, ${product_id}, '${body}', ${+new Date()}, '${name}', '${email}')
        RETURNING *
      `;
      await db.query(postQuestionQueryStr);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

  postAnswer: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { body, name, email, photos } = req.body;
      const postAnswerQuery = () => `
        INSERT INTO answers(id, question_id, answer_body, answer_date, answerer_name, answerer_email)
        VALUES(${nextAnswerId}, ${question_id}, '${body}', ${+new Date()}, '${name}', '${email}')
        RETURNING *
      `;
      const postAnswersPhotosQuery = (photo) => `
        INSERT INTO answers_photos(id, answer_id, url)
        VALUES(${nextAnswerPhotoId++}, ${nextAnswerId}, '${photo}')
        RETURNING *
      `;
      const print2 = await db.query(postAnswerQuery);
      const print1 = await Promise.all(photos.map(photo => postAnswersPhotosQuery(photo)))
      console.log(print1, print2)
      nextAnswerId++;
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
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
