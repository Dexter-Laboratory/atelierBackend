const db = require('../db');

module.exports = {
  addAnswerHelpfulQuery: async (answer_id) => {
    // Updates an answer to show it was found helpful.
  },

  reportAnswerQuery: async (answer_id) => {
    // Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  },
};
