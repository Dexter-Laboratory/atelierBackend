const express = require('express');
const router = express.Router();
const controller, { questions, answers } = require('./qna_controller');

// List Questions
router.get('', questions.getQuestions)

// Answers List
router.get('/:question_id/answers', answers.getAnswers)

// Add a Question
router.post('/qa/questions', questions.postQuestion);

// Add an Answer
router.post('/:question_id/answers', answers.postAnswer);

//Mark Question as Helpful
router.put('/:question_id/helpful', questions.addQuestionHelpful);

// Report Question
router.put('/:question_id/report', questions.reportQuestion);

// Mark Answer as Helpful
router.put('/:answer_id/helpful', answers.addAnswerHelpful);

// Report Answer
router.put('/:answer_id/report', answers.reportAnswer);

module.exports = router;