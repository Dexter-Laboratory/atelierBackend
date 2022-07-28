// TODO: import db index.js connection


module.exports = {
  reportAnswerQuery: (answer_id) => {
    // Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  },

  getAnswersQuery: (question_id, page, count) => {
    // Returns answers for a given question. This list does not include any reported answers.
  },

  postAnswerQuery: (body, name, email, photos) => {
    // Adds an answer for the given question
  },

  addAnswerHelpfulQuery: (answer_id) => {
    // Updates an answer to show it was found helpful.
  },
};
