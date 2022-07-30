// const { addAnswerHelpfulQuery, reportAnswerQuery } =
//   require("../qna_model").answers;

module.exports = {
  addAnswerHelpful: async (req, res) => {
    try {
      const { answer_id } = req.params;
       // TODO: Possibly build a logic to only allow one helpfulness count up per user
      const result = await  await db.one(`UPDATE answers SET helpful = helpful + 1 WHERE id=${answer_id}`)
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
    }
  },

  reportAnswer: async (req, res) => {
    try {
      const { answer_id } = req.params;
       // TODO: Possibly build a logic to only allow one report per question. Maybe just remember the reported questions in memory
      await db.one(`UPDATE answers SET reported = true WHERE id=${answer_id}`)
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
    }
  },
};
