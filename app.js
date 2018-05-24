import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import {Client} from 'pg';
import logger from 'morgan';
import userRoutes from './Server/routes/userRoute';
import requestRoutes from './Server/routes/requestRoute';

require('dotenv').config();

const client = new Client();
client.connect()
  .then(() => {
    const sql = 'INSERT INTO registereduser( firstname, lastname, email, mobile, password, role) VALUES ( $1, $2, $3, $4, $5, $6) ';
    const params = ['nari', 'beto', 'email@chima.com', '08025797737', 'password124', 'true'];
    return client.query(sql, params);
  })
  .then((result) => {
    winston.info(result);
  })
const app = express();
const port = process.env.port || 3000;

// Log HTTP methods to console
app.use(logger('dev'));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/users', requestRoutes);

app.get('*', (req, res, next) => {
  res.status(501).json({ message: 'Something went wrong' });
  next();
});

app.listen(port, () => { winston.info(`Server is running on port ${port}`); });

export default app;
