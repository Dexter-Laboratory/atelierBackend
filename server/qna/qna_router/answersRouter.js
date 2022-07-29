const router = require('express').Router();
const { addAnswerHelpful, reportAnswer } = require('../model-controller').answers;

// Mark Answer as Helpful
router.put('/:answer_id/helpful', addAnswerHelpful);

// Report Answer
router.put('/:answer_id/report', reportAnswer);

module.exports = router;