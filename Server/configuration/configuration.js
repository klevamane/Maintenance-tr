import dotenv from 'dotenv';

dotenv.config();

// Setup configuration based on environment
const configuration = {
  development: {
    user: process.env.LOCALDBUSER,
    password: process.env.LOCALDBPSWD,
    database: process.env.LOCALDB,
    // database: 'testonly',
    host: process.env.LOCALDBHOST,
    // port: process.env.LOCALDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 3000
  },

  proddev: {
    user: process.env.PRODDBUSER,
    password: process.env.PRODDBPSWD,
    database: process.env.PRODDB,
    // database: 'testonly',
    host: process.env.PRODDBSERVE,
    port: process.env.PRODDPORT,
    max: 5,
    idleTimeoutMillis: 6000,
    connectionTimeoutMillis: 9000
  },
  // test environment configuration
  // test environment configuration
  test: {
    user: 'user',
    password: 'user',
    database: 'testdb2',
    host: '127.0.0.1',
    //  port: process.env.TESTDBSERVERPORT,
    max: 10,
    idleTimeoutMillis: 6000,
    connectionTimeoutMillis: 9000
  },

  production: {
    user: process.env.MTUSER,
    password: process.env.MTDBPSW,
    database: process.env.MTDB,
    host: process.env.MTHOST,
    port: process.env.MTPORT,
    max: 10,
    idleTimeoutMillis: 6000,
    connectionTimeoutMillis: 9000,
    ssl: {
      rejectedUnauthorized: false
    }
  }
};

export default configuration;
