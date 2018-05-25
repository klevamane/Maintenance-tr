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
const connectionSettings = configuration[connectionConfig];
const db = new Pool(connectionSettings);
export default db;
