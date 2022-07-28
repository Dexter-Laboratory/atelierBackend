const db = require('../db');

module.exports = {
  getQuestionsQuery: async(product_id, page, count) => {
    // Retrieves a list of questions for a particular product. This list does not include any reported questions.
  },

  postQuestionQuery: async(body, name, email, product_id) => {
    // Add a Question
  },

  getAnswersQuery: async(question_id, page, count) => {
    // Returns answers for a given question. This list does not include any reported answers.
  },

  postAnswerQuery: async(body, name, email, photos) => {
    // Adds an answer for the given question
  },
  
  addQuestionHelpfulQuery: async(question_id) => {
    // Updates a question to show it was found helpful.
  },

  reportQuestionQuery: async(question_id) => {
    // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
  },
};
