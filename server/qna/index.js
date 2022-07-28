const express = require('express')
const app = express();
const { questions, answers } = require('./qna_router')

app.use(express.json());

app.use('/qa/questions' , questions);

app.use('/qa/answers' , answers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server listening on PORT ' PORT);
})