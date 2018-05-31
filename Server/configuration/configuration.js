import dotenv from 'dotenv';

dotenv.config();

// Setup configuration based on environment
const configuration = {
  development: {
    user: process.env.LOCALDBUSER,
    password: process.env.LOCALDBPSWD,
    database: 'dbtester',
    // database: 'testonly',
    host: process.env.LOCALDBHOST,
    port: process.env.LOCALDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  },
  // test environment configuration
  test: {
    user: 'user',
    password: 'user',
    database: 'testdb',
    host: '127.0.0.1',
    //  port: process.env.TESTDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  },

  production: {
    user: process.env.MTUSER,
    password: process.env.MTDBPSW,
    database: process.env.MTDB,
    host: process.env.MTHOST,
    port: process.env.MTPORT,
    max: 10,
    idleTimeoutMillis: 3000
  }
};

export default configuration;
