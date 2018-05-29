import winston from 'winston';
import dbconnect from '../../../connection';

dbconnect.connect()
  .then(() => {
    const userIdForeignKey = `ALTER TABLE "request" ADD CONSTRAINT
     "reguserid_fk0" FOREIGN KEY ("userid") REFERENCES "registereduser"("id")`;
    // continue the chain by returning result to the next then block
    dbconnect.query(userIdForeignKey);
  })
  .then(() => {
    winston.info('Register user foreign keyhas created');
    const statusIdForeignKey = `ALTER TABLE "request" ADD CONSTRAINT 
     "statusid_fk0" FOREIGN KEY ("statusid") REFERENCES "status"("id")`;
    dbconnect.query(statusIdForeignKey);
  })
  .then(() => {
    winston.info('Status Id foreign key has been created');
    const requestIdForiegnKey = `ALTER TABLE "requestmessage" 
    ADD CONSTRAINT "requestid_fk0" FOREIGN KEY ("requestid") REFERENCES "request"("id")`;
    dbconnect.query(requestIdForiegnKey);
  })
  .then(() => {
    winston.info('Request Id foreign key has been created');
    const messageRegUserForeignKey = `ALTER TABLE "requestmessage" ADD CONSTRAINT 
    "reguser_fk0" FOREIGN KEY ("userid") REFERENCES "registereduser"("id")`;
    dbconnect.query(messageRegUserForeignKey);
  })
  .then(() => {
    winston.info('User Id foreign key has been created form request message table');
  })
  .then(() => {
    const insertquery = `INSERT INTO registereduser(firstname, lastname, email, mobile, password)
      VALUES ('Inivie', 'Bob', 'iniv@gmx.com', '08035672921',
      '$2b$10$zALOeppbhmwCuDPbwrfkBeP2aCXbfrdkiEHQaQGnA3T20RN8vWCqu')`;
    dbconnect.query(insertquery);
    winston.info('User Id foreign key has been created form request message table');
  })
  .then(() => {
    dbconnect.query('insert into status(name) values("Pending")');
  })
  .catch((err) => {
    winston.info(`Error Adding Foreign Key constraints ${err}`);
  });
