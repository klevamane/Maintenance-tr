import winston from 'winston';
import dbconnect from '../../../connection';

const registeredUserTableQuery = `CREATE TABLE "registereduser" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "firstname" character varying(200) NOT NULL,
    "lastname" character varying(200) NOT NULL,
    "email" character varying(200) NOT NULL UNIQUE,
    "mobile" character varying(11) NOT NULL UNIQUE,
    "password" character varying(200) NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT 'false',
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
"createdon" TIMESTAMP NOT NULL,
CONSTRAINT request_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;

const requestMessageTableQuery = `CREATE TABLE "requestmessage" (
"id" serial NOT NULL,
"requestid" serial NOT NULL,
"userid" uuid NOT NULL,
"comment" character varying(250) NOT NULL,
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
CONSTRAINT contactus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)`;


// Foreign key constraints
const reguseridFk0 = `ALTER TABLE "request" ADD CONSTRAINT "reguserid_fk0" FOREIGN KEY
 ("userid") REFERENCES "registereduser"("id")`;
const statusidFk0 = `ALTER TABLE "request" ADD CONSTRAINT "statusid_fk0"
 FOREIGN KEY ("statusid") REFERENCES "status"("id")`;
const requestidFk0 = `ALTER TABLE "requestmessage" ADD CONSTRAINT "requestid_fk0" 
 FOREIGN KEY ("requestid") REFERENCES "request"("id")`;
const reguserFk0 = `ALTER TABLE "requestmessage" ADD CONSTRAINT "reguser_fk0" 
 FOREIGN KEY ("userid") REFERENCES "registereduser"("id")`;


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
  // .then(() => {
  //   dbconnect.query(contactUsTableQuery);
  // })
  // .then(() => {
  //   dbconnect.query(reguseridFk0);
  // })
  // .then(() => {
  //   dbconnect.query(statusidFk0);
  // })
  // .then(() => {
  //   dbconnect.query(requestidFk0);
  // })
  // .then(() => {
  //   dbconnect.query(reguserFk0);
  // })
  .catch((err) => {
    winston.info(`Error from creating extensions ${err}`);
  });


// dbconnect.query(reguseridFk0)
//   .then(() => {
//     dbconnect.query(statusidFk0);
//   })
//   .then(() => {
//     dbconnect.query(requestidFk0);
//   })
//   .then(() => {
//     dbconnect.query(reguserFk0);
//     winston.info('Finished creating Foreign key constraints');
//   })
//   .catch((err) => {
//     winston.info(`Error from adding foreign key ${err}`);
//   });
