const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const { notFound, errorHandler } = require('./middlewares/errors');
const { authenticateToken } = require('./middlewares/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'For more information go to /api' });
});

app.post('*', (req, res, next) => {
  authenticateToken(req, res, next);
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
