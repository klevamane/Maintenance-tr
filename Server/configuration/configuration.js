import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  development: {
    user: process.env.LOCALDBUSER,
    password: process.env.LOCALDBPSWD,
    // database: process.env.LOCALDB,
    database: 'dbtester',
    host: process.env.LOCALDBHOST,
    port: process.env.LOCALDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  },

  test: {
    user: process.env.TESTDBUSER,
    password: process.env.TESTDBPSWD,
    database: process.env.TESTDB,
    host: process.env.TESTDBHOST,
    //  port: process.env.TESTDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  },

  production: {
    user: process.env.PRODDBUSER,
    password: process.env.PRODDBPSWD,
    database: process.env.PRODDB,
    host: process.env.PRODDBHOST,
    port: process.env.PRODDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  }
};

export default configuration;
