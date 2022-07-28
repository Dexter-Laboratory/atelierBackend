// TODO: import db index.js connection

module.exports = {
  getQuestionsQuery: (product_id, page, count) => {
    // Retrieves a list of questions for a particular product. This list does not include any reported questions.
  },

  postQuestionQuery: (body, name, email, product_id) => {
    // Add a Question
  },

  addQuestionHelpfulQuery: (question_id) => {
    // Updates a question to show it was found helpful.
  },

  reportQuestionQuery: (question_id) => {
    // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
  },
};
