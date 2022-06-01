const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/arounddb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6297c97c84218e176d14a13f',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
