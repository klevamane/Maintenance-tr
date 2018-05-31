import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'morgan';
import dotenv from 'dotenv';

import userRoutes from './Server/routes/userRoute';
import requestRoutes from './Server/routes/requestRoute';
import adminRoutes from './Server/routes/adminRoute';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Log HTTP methods to console
app.use(logger('dev'));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker' });
});
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/users', requestRoutes);
app.use('/api/v1', adminRoutes);


app.get('*', (req, res, next) => {
  res.status(404).json({ message: 'Something went wrong' });
  next();
});

app.listen(port, () => { winston.info(`Server is running on port ${port}`); });

export default app;
