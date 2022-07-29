const pgp = require('pg-promise')({});

const connectString = 'postgresql://@localhost:5432/qna'

const db = pgp(connectString);

module.exports = db;