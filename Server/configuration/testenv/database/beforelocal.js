import winston from 'winston';
import dbconnect from '../../../connection';
const sql = `CREATE DATABASE dbtester3
OWNER = "user"
ENCODING = 'UTF8'
LC_COLLATE = 'English_United States.1252'
LC_CTYPE = 'English_United States.1252'
TABLESPACE = pg_default
CONNECTION LIMIT = -1`;
winston.log('form beforelocal');
dbconnect.query(sql)
//   .then(() => {
// //     dbconnect.query(sql);
// //   })
  .then(() => winston.info('Database has been created from beforelocal.js'))
  .catch((err) => {
    winston.info(`Error from creating extensions ${err}`);
  });
