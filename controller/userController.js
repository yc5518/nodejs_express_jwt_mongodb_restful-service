const bcrypt = require('bcrypt');
const User = require('../model/userModel');

// Handle view user info
exports.view = function viewUser(req, res) {
  User.findById(req.userId,
    {
      password: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0,
    },
    (err, user) => {
      if (err) return res.status(500).send('There was a problem finding the user.');
      if (!user) return res.status(404).send('No user found.');

      res.status(200).send(user);
    }).lean();
};

// Handle update user info
exports.update = function userUpdate(req, res) {
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;

    // TODO: add salt to hashedPassword
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    user.password = hashedPassword;
    // save the user and check for errors
    user.save((error) => {
      if (error) res.json(error);
      res.json({
        message: 'user Info updated',
        data: user,
      });
    });
  }).lean();
};
