require("dotenv").config();

const pgp = require("pg-promise")({});

const connectString = `postgresql://${process.env.PGUSER}:${process.env.PASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
// const cn = 'postgres://username:password@host:port/database';
const db = pgp(connectString);

module.exports = db;
