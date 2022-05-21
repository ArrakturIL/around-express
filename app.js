const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
