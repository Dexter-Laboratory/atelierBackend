require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

const { questions, answers } = require("./qna_router");

app.use(express.json());

console.log("Request received!!!");

app.get("/loaderio-74bf8daed0a5e478d355c284c28f9269/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/db/loaderio-74bf8daed0a5e478d355c284c28f9269.txt")
  );
});

app.use("/qa/questions", questions);

app.use("/qa/answers", answers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT " + PORT);
});
