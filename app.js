import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'morgan';
import userRoutes from './Server/routes/userRoute';
import requestRoutes from './Server/routes/requestRoute';

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
