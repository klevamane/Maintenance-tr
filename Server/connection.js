import winston from 'winston';
import pg from 'pg';
import configuration from '../Server/configuration/configuration';

const { Pool } = pg;
let connectionConfig;
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
  connectionConfig = 'development';
} else if (process.env.NODE_ENV !== test || process.env.NODE_ENV !== 'development') {
  connectionConfig = 'production';
} else {
  connectionConfig = test;
}
if (process.env.NODE_ENV === 'production') {
  connectionConfig = 'production';
}
const connectionSettings = configuration[connectionConfig];
const db = new Pool(connectionSettings);

winston.info(connectionConfig);
export default db;
