const db = require('../db');

module.exports = {
  addAnswerHelpful: async (req, res) => {
    try {
      const { answer_id } = req.params;
      await db.query(`UPDATE answers SET answers_helpfulness = answers_helpfulness + 1 WHERE id=${answer_id} RETURNING *`);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  reportAnswer: async (req, res) => {
    try {
      const { answer_id } = req.params;
      await db.one(`UPDATE answers SET reported = true WHERE id=${answer_id} RETURNING *`);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  },
};