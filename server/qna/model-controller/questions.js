// const {
//   getQuestionsQuery,
//   postQuestionQuery,
//   getAnswersQuery,
//   postAnswerQuery,
//   addQuestionHelpfulQuery,
//   reportQuestionQuery,
// } = require("../qna_model").questions;

const db = require('../db');

// Retrieves a list of questions for a particular product. This list does not include any reported questions.

module.exports = {
  getQuestions: async (req, res) => {
    console.log('hello')
    try {
      const { product_id, page = '1', count = '5' } = req.query;

      const questionData = await db.any(`SELECT * FROM questions WHERE product_id=${product_id} AND reported = false`);
      // TODO: Need to fetch all the answers related to each questions here

      const results = await Promise.all(questionData.map(async (question) => {
        const answerData = await db.any(`SELECT * FROM answers WHERE question_id=${question.id} AND reported = false`);
        //TODO: answer needs to be reduced to an object with id as key and data as its value
        const answers = answerData.reduce((allAnswers,answer) => {
          return {...allAnswers, [answer.id]: {
            id: answer.id,
            body: answer.body,
            date: new Date(answer.date_written * 1000).toISOString().slice(1),
            answerer_name: answer.answerer_name,
            helpfulness: answer.helpful,
            photos: [],
          }};
        }, {})
        console.log(answers);
        const {id: question_id, body: question_body, date_written: question_date, asker_name, helpful: question_helpfulness, reported} = question;
        return {
          question_id,
          question_body,
          question_date:  new Date(question_date * 1000).toISOString().slice(1),
          asker_name,
          question_helpfulness,
          reported,
          answers
        };
        // TODO: Build logic to structure and create usable data
      }));

      const data = { product_id, results }



      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  getAnswers: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { page, count } = req.query;
      const result = await getAnswersQuery(question_id, page, count);
      console.log(data);
      // TODO: Build logic to structure and create usable data
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  },

  postQuestion: async (req, res) => {
    try {
      const { body, name, email, product_id } = req.body;
      // TODO: Build logic to verify correct data from client
      const result = await postQuestionQuery(body, name, email, product_id);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  postAnswer: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { body, name, email, photos } = req.body;
      // TODO: Build logic to verify correct data from client
      const result = await postAnswerQuery(body, name, email, photos);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
    }
  },

  addQuestionHelpful: async (req, res) => {
    try {
      const { question_id } = req.params;
      // TODO: Possibly build a logic to only allow one helpfulness count up per user
      const result = await addQuestionHelpfulQuery(question_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  reportQuestion: async (req, res) => {
    try {
      const { question_id } = req.params;
      // TODO: Possibly build a logic to only allow one report per question. Maybe just remember the reported questions in memory
      const result = await reportQuestionQuery(question_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};
