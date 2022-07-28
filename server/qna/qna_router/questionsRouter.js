const router = require('express').Router();
const { questions } = require('./qna_controller');

// List Questions
router.get('', questions.getQuestions)

// Answers List
router.get('/:question_id/answers', answers.getAnswers)

// Add a Question
router.post('', questions.postQuestion);

// Add an Answer
router.post('/:question_id/answers', answers.postAnswer);

//Mark Question as Helpful
router.put('/:question_id/helpful', questions.addQuestionHelpful);

// Report Question
router.put('/:question_id/report', questions.reportQuestion);

module.exports = router;