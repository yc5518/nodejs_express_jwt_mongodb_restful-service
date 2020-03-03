const mongoose = require('mongoose');
const { routeStatusTypes } = require('./routeStatusEnum');

const routeSchema = mongoose.Schema({
  _id: String,
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  scheduledStart: {
    type: Date,
    required: true,
  },
  scheduledEnd: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [...routeStatusTypes],
    required: true,
  },
}, {
  timestamps: true,
});
const Route = module.exports = mongoose.model('route', routeSchema);
module.exports.get = function (callback, limit) {
  Route.find(callback).limit(limit);
};
