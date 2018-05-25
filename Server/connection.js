import pg from 'pg';

const { Pool } = pg;
// // 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// const connectionString = 'postgresql://user:user@localhost:5432/challengedb';

// const db = new Pool({
//   connectionString,
// });
const connectionConfig = {
  user: 'user',
  host: 'localhost',
  database: 'challengedb',
  password: 'user',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
const db = new Pool(connectionConfig);
export default db;
