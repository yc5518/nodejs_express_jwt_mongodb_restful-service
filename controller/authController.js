var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
User = require('../model/userModel');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');

// Handle create user actions
exports.new = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: hashedPassword,
        phone: req.body.phone
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });

    //     var user = new User();
    //     user.name = req.body.name ? req.body.name : user.name;
    //     user.gender = req.body.gender;
    //     user.email = req.body.email;
    //     user.password = hashedPassword;
    //     user.phone = req.body.phone;
    // // save the user and check for errors
    //     user.save(function (err) {
    //         // if (err)
    //         //     res.json(err);
    // res.json({
    //             message: 'New user created!',
    //             data: user
    //         });
    //     });
};