var mongoose = require('mongoose');
let { routeStatusTypes } = require('./routeStatusEnum')

var routeSchema = mongoose.Schema({
    _id: String,
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    scheduledStart: {
        type: Date,
        required: true
    },
    scheduledEnd: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: [...routeStatusTypes],
        required: true
    }
}, {
    timestamps: true,
});
var Route = module.exports = mongoose.model('route', routeSchema);
module.exports.get = function (callback, limit) {
    Route.find(callback).limit(limit);
}