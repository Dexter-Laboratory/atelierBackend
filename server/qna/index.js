const express = require('express')
const app = express();
const router = require('./router.js');

app.use(express.json());
app.use('/qa/questions' , router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server listening on PORT ' PORT);
})