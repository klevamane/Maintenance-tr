import winston from 'winston';
import dbconnect from '../../../connection';

// Foreign key constraints
const reguseridFk0 = `ALTER TABLE "request" ADD CONSTRAINT "reguserid_fk0" FOREIGN KEY 
  ("userid") REFERENCES "registereduser"("id") ON DELETE CASCADE`;
const statusidFk0 = `ALTER TABLE "request" ADD CONSTRAINT "statusid_fk0" FOREIGN KEY 
  ("statusid") REFERENCES "status"("id") ON DELETE CASCADE`;
const requestidFk0 = `ALTER TABLE "requestmessage" ADD CONSTRAINT "requestid_fk0
  " FOREIGN KEY ("requestid") REFERENCES "request"("id") ON DELETE CASCADE`;
const reguserFk0 = `ALTER TABLE "requestmessage" ADD CONSTRAINT "reguser_fk0" FOREIGN KEY
   ("userid") REFERENCES "registereduser"("id") ON DELETE CASCADE`;

// const sqlExtension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
dbconnect.query(reguseridFk0)
  .then(() => {
    dbconnect.query(statusidFk0);
  })
  .then(() => {
    dbconnect.query(requestidFk0);
  })
  .then(() => {
    dbconnect.query(reguserFk0);
  })
  .then(() => {
    const insertquery = `INSERT INTO registereduser(firstname, lastname, email, mobile, password)
      VALUES ('Inivie', 'Bob', 'iniv@gmx.com', '08035672921',
      '$2b$10$zALOeppbhmwCuDPbwrfkBeP2aCXbfrdkiEHQaQGnA3T20RN8vWCqu')`;
    dbconnect.query(insertquery);
    winston.info('User Id foreign key has been created form request message table');
  })
  .then(() => {
    const insertquery = `INSERT INTO registereduser(firstname, lastname, email, mobile, password, isadmin)
      VALUES ('onengi', 'Bob', 'admin@gmx.com', '08035672922',
      '$2b$10$zALOeppbhmwCuDPbwrfkBeP2aCXbfrdkiEHQaQGnA3T20RN8vWCqu', true)`;
    dbconnect.query(insertquery);
    winston.info('User Id foreign key has been created form request message table');
  })
  .then(() => {
    const sqlStatus = `INSERT INTO status(name)
           VALUES ('Inactive')`;
    dbconnect.query(sqlStatus);
  })
  .then(() => {
    const sqlStatus = `INSERT INTO status(name)
           VALUES ('Pending')`;
    dbconnect.query(sqlStatus);
  })
  .then(() => {
    const sqlStatus = `INSERT INTO status(name)
           VALUES ('Disapproved')`;
    dbconnect.query(sqlStatus);
  })
  .then(() => {
    const sqlStatus = `INSERT INTO status(name)
           VALUES ('Resolved')`;
    dbconnect.query(sqlStatus);
  })
  .catch((err) => {
    winston.info(`Error from creating extensions ${err}`);
  });
