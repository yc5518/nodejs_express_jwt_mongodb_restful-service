const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: String,
  phone: String,
  password: String,
}, {
  timestamps: true,
});
const User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
