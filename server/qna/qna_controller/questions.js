const {
  getQuestionsQuery,
  postQuestionQuery,
  getAnswersQuery,
  postAnswerQuery,
  addQuestionHelpfulQuery,
  reportQuestionQuery,
} = require("../qna_model").questions;

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { product_id, page, count } = req.query;
      const data = await getQuestionsQuery(product_id, page, count);
      res.status(200).json(data);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  getAnswer: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { page, count } = req.query;
      const result = await getAnswersQuery(question_id, page, count);
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  },

  postQuestion: async (req, res) => {
    try {
      const { body, name, email, product_id } = req.body;
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
      const result = await postAnswerQuery(body, name, email, photos);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
    }
  },

  addQuestionHelpful: async (req, res) => {
    try {
      const { question_id } = req.params;
      const result = await addQuestionHelpfulQuery(question_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  reportQuestion: async (req, res) => {
    try {
      const { question_id } = req.params;
      const result = await reportQuestionQuery(question_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};
