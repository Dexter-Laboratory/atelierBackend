const { addAnswerHelpfulQuery, reportAnswerQuery } =
  require("../qna_model").answers;

module.exports = {
  addAnswerHelpful: async (req, res) => {
    try {
      const { answer_id } = req.params;
      const result = await addAnswerHelpfulQuery(answer_id);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
    }
  },

  reportAnswer: async (req, res) => {
    try {
      const { answer_id } = req.params;
      const result = await reportAnswerQuery(answer_id);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
    }
  },
};
