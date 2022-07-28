const model, { questions } = require('../qna_model')

module.exports = {
  getQuestions: (req, res) => {
    const { product_id, page, count } = req.query;
    questions.getQuestionsQuery(product_id, page, count)
      .then(data => {
        res.status(200).send(data);
      })
    .catch(err => res.sendStatus(404))
  },

  postQuestion = (req, res) => {
    const { body, name, email, product_id } = req.body;
    questions.postQuestionQuery(body, name, email, product_id)
      .then(() => res.sendStatus(201))
      .catch(err => console.log(err))
  },

  addQuestionHelpful = (req, res) => {
    const { question_id } = req.params;
    questions.addQuestionHelpfulQuery(question_id)
      .then(() => res.sendStatus(204);)
      .catch(err => console.log(err))

  },

  reportQuestion =  (req, res) => {
    const { question_id } = req.params;
    questions.reportQuestionQuery(question_id)
      .then(() => res.sendStatus(204))
      .catch(err => console.log(err))
  },
}