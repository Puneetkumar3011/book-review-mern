const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const appConstants = require('../core/app.constants');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const password = req.body.password;
  let user = new User({
    email: req.body.email,
    password: password,
    name: req.body.name
  });

  bcrypt
    .hash(password, 12)
    .then(hashedPwd => {
      user.password = hashedPwd;
      return user.save();
    })
    .then(result => {
      let loggedInUser = {};
      loggedInUser.email = user.email;
      loggedInUser.id = user._id.toString();
      res.status(201).json({ message: 'User created!', user: loggedInUser});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loggedInUser = {};
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loggedInUser.email = user.email;
      loggedInUser.id = user._id.toString();
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loggedInUser.email,
          userId: loggedInUser.id
        },
        appConstants.loginSecreteKey,
        { expiresIn: '5h' }
      );
      res.status(200).json({ token: token, user: loggedInUser });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
