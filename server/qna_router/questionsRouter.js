const router = require("express").Router();
const path = require("path");
const {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  addQuestionHelpful,
  reportQuestion,
} = require("../model-controller").questions;
// const { getQuestions } = require('../model-controller').questions;

// List Questions
router.get("", getQuestions);

router.get("/loaderio-072dcb9324d8a7b71a419894a382eb21/", (req, res) => {
  res.sendFile(
    path.join(__dirname, '/server/db/loaderio-072dcb9324d8a7b71a419894a382eb21.txt');
  );
});

// Answers List
router.get("/:question_id/answers", getAnswers);

// Add a Question
router.post("", postQuestion);

// Add an Answer
router.post("/:question_id/answers", postAnswer);

//Mark Question as Helpful
router.put("/:question_id/helpful", addQuestionHelpful);

// Report Question
router.put("/:question_id/report", reportQuestion);

module.exports = router;
