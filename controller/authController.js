const uuid = require('uuid/v4');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const config = require('../config');

// Handle user registration action
exports.new = function createUser(req, res) {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result !== null) {
        return res.status(409).send(`Email ${req.body.email} already exists in system.`);
      }
    });
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    _id: uuid(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: hashedPassword,
    phone: req.body.phone,
  },
  (err, user) => {
    if (err) {
      return res.status(500).send('There was a problem registering the user.');
    }
    // create a token
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    return res.status(200).send({ auth: true, token });
  });
};

// Handle user login action
exports.login = function login(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    return res.status(200).send({ auth: true, token });
  });
};
