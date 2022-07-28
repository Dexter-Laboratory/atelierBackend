const router = require('express').Router();
const { answers } = require('./qna_controller');

// Mark Answer as Helpful
router.put('/:answer_id/helpful', answers.addAnswerHelpful);

// Report Answer
router.put('/:answer_id/report', answers.reportAnswer);

module.exports = router;