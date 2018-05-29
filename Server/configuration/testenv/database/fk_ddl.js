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
  .catch((err) => {
    winston.info(`Error from creating extensions ${err}`);
  });
