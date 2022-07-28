const pgp = require('pg-promise')();
module.exports = db = pgp('postgress://localhost:3000/qna');