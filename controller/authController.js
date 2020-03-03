User = require('../model/userModel');
const uuid = require('uuid/v4');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let config = require('../config');

// Handle user registration action
exports.new = function (req, res) {

    // TODO: add salt to hashedPassword
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        _id: uuid(),
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: hashedPassword,
        phone: req.body.phone
    },
        function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem registering the user.")
            }
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
};

// Handle user login action
exports.login = function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
};