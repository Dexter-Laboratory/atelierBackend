const model, { answers } = require('../qna_model')

module.exports = {
  getAnswer: (req, res) => {
    const { question_id } = req.params;
    const { page, count } = req.query;
    answers.getAnswersQuery(question_id, page, count)
      .then(data => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch(err => console.log(err))
  },

  postAnswer =  (req, res) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    answers.postAnswerQuery(body, name, email, photos)
      .then(() => res.sendStatus(201))
      .catch(err => console.log(err))
  },

  addAnswerHelpful = (req, res) => {
    const { answer_id } = req.params;
    answers.addAnswerHelpfulQuery(answer_id)
      .then(() => res.sendStatus(204))
      .catch(err => console.log(err))

  },

  reportAnswer = (req, res) => {
    const { answer_id } = req.params;
    answers.reportAnswerQuery(answer_id)
      .then(() => res.sendStatus(204))
      .catch(err => console.log(err))
  }

}