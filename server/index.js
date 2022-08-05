require("dotenv").config();

const express = require("express");
const app = express();

const { questions, answers } = require("./qna_router");

app.use(express.json());

console.log("Request received!!!");

app.get("/loaderio-072dcb9324d8a7b71a419894a382eb21/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "/server/db/loaderio-072dcb9324d8a7b71a419894a382eb21.txt"
    )
  );
});

app.use("/qa/questions", questions);

app.use("/qa/answers", answers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT " + PORT);
});
