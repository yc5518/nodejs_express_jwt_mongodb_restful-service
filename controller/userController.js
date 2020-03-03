let User = require('../model/userModel');

// Handle view user info
exports.view = function (req, res) {
    User.findById(req.userId,
        { password: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
};

// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;

        // TODO: add salt to hashedPassword
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        user.password = hashedPassword;
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'user Info updated',
                    data: user
                });
            });
    });
};