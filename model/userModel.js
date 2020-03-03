// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    password: String,
}, {
    timestamps: true,
});
// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}