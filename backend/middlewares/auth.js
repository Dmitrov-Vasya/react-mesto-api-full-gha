const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(new AuthorizationError('Необходима авторизация'));
    }
    const reqUser = jwt.verify(token, 'bUKN7CkRUJuzC4hJhevpz9m3');
    req.user = reqUser;
    return next();
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
};
