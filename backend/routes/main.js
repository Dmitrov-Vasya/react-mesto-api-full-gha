const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

const validationUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// без проверки авторизации
router.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.get('/signout', logout);

router.post(
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
        .regex(validationUrlRegex),
    }),
  }),
  createUser,
);

// с проверкой авторизации
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError(' Страница не найдена'));
});

module.exports = router;
