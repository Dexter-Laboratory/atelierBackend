const router = require("express").Router();
const cache = require("../model-controller/cacheMiddle.js");
const {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  addQuestionHelpful,
  reportQuestion,
} = require("../model-controller").questions;

// List Questions
// router.get("", getQuestions);
router.get("", cache(300), getQuestions);

// Answers List
// router.get("/:question_id/answers", getAnswers);
router.get("/:question_id/answers", cache(300), getAnswers);

// Add a Question
router.post("", postQuestion);

// Add an Answer
router.post("/:question_id/answers", postAnswer);

//Mark Question as Helpful
router.put("/:question_id/helpful", addQuestionHelpful);

// Report Question
router.put("/:question_id/report", reportQuestion);

module.exports = router;
