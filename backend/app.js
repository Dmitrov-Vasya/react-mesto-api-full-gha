const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorResponse = require('./middlewares/errorResponse');

const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// без проверки авторизации
app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        )
        .regex(regex),
    }),
  }),
  createUser,
);

// с проверкой авторизации
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res, next) => {
  next(new NotFoundError(' Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorResponse);

app.listen(3000);
