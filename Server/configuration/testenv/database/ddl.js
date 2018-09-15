import winston from 'winston';
import dbconnect from '../../../connection';

const checkDBprocesses = `SELECT * FROM pg_stat_activity WHERE datname = ${process.env.TESTDB}`; // to be used
const dropDB = `DROP DATABASE ${process.env.TESTDB}`;
const createDB = `CREATE DATABASE ${process.env.TESTDB}`;
const registeredUserTableQuery = `CREATE TABLE "registereduser" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "firstname" character varying(200) NOT NULL,
    "lastname" character varying(200) NOT NULL,
    "email" character varying(200) NOT NULL UNIQUE,
    "mobile" character varying(11) NOT NULL UNIQUE,
    "password" character varying(200) NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT 'false',
    "isactive" character varying(250),
    "resetpassword" character varying(250),
    "createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT registereduser_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
) `;

const createRequestTableQuery = `CREATE TABLE "request" (
"id" serial NOT NULL,
"fault" character varying(200) NOT NULL,
"brand" character varying(200) NOT NULL,
"modelnumber" character varying(200),
"userid" uuid NOT NULL,
"description" character varying(250) NOT NULL,
"other" character varying(250),
"statusid" serial NOT NULL,
"createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT request_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;

const requestMessageTableQuery = `CREATE TABLE "requestmessage" (
"id" serial NOT NULL,
"requestid" serial NOT NULL,
"userid" uuid NOT NULL,
"comment" character varying(250) NOT NULL,
"createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT requestmessage_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;

const statusTableQuery = `CREATE TABLE "status" (
"id" serial NOT NULL,
"name" character varying(200) NOT NULL,
CONSTRAINT status_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;

const contactUsTableQuery = `CREATE TABLE "contactus" (
"id" serial NOT NULL,
"name" character varying(200) NOT NULL,
"email" character varying(100) NOT NULL,
"message" TEXT NOT NULL,
"createdon" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT contactus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;


// const dropCreateDB = async (value) => {
//   try {
//     const res = await dbconnect.query(value);
//     console.log(res.rows[0]);
//     console.log(value);
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//   } catch (err) {
//     console.log(err.stack);
//   }
// };

// dropCreateDB(dropDB);
// dropCreateDB(createDB);

const sqlExtension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
dbconnect.query(sqlExtension)
  .then(() => {
    dbconnect.query(registeredUserTableQuery);
  })
  .then(() => {
    dbconnect.query(statusTableQuery);
    winston.info('Status table has been created');
  })
  .then(() => {
    dbconnect.query(createRequestTableQuery);
    //     winston.info('Requests table has been created');
  })
  .then(() => {
    dbconnect.query(requestMessageTableQuery);
  })
  .catch((err) => {
    winston.info(`Error from creating extensions ${err}`);
  });
