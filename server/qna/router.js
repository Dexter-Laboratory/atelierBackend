const express = require('express');
const router = express.Router();
const model = require('./qna_model');

// List Questions
// Status: 200 OK
// Retrieves a list of questions for a particular product. This list does not include any reported questions.
router.get('', (req, res) => {
  const { product_id, page, count } = req.query;
  console.log(product_id, page, count);
  res.send();
})
// Answers List
// Status: 200 OK
// Returns answers for a given question. This list does not include any reported answers.
router.get('/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const { page, count } = req.query;
  console.log(product_id);
  res.send();
})

// Add a Question
  // Add a Question
  // Status: 201 CREATED
router.post('/qa/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;
});

// Add an Answer
  // Adds an answer for the given question
  // Status: 201 CREATED
router.post('/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;
});

//Mark Question as Helpful
  // Updates a question to show it was found helpful.
  // Status: 204 NO CONTENT
router.post('/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;
});

// Report Question
  // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
  // Status: 204 NO CONTENT
router.post('/:question_id/report', (req, res) => {
  const { question_id } = req.params;
});
// Mark Answer as Helpful
// Updates an answer to show it was found helpful.
  // Status: 204 NO CONTENT
router.post('/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params;
});

// Report Answer
  // Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  // Status: 204 NO CONTENT
router.post('/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;
});

module.exports = router;