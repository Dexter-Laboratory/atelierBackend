const pgp = require('pg-promise')({});

const connectString = 'postgresql://@localhost:5432/questions_answers'

const db = pgp(connectString);

module.exports = db;