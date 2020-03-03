let Route = require('../model/routeModel');
const uuid = require('uuid/v4');

exports.new = function (req, res) {
    Route.create({
        _id: uuid(),
        userId: req.userId,
        name: req.body.name,
        scheduledStart: req.body.scheduledStart,
        scheduledEnd: req.body.scheduledEnd,
        status: req.body.status
    },
        function (err, route) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem adding a new route.")
            }
            res.status(200).send({ status: 'Success', message: 'Route successfully created.' });
        });
}

exports.view = function (req, res) {
    Route.findById({
        _id: req.params.route_id,
        userId: req.userId
    },
        { userId: 0, createdAt: 0, updatedAt: 0, __v: 0 },
        function (err, route) {
            if (err) return res.status(500).send("There was a problem finding the route.");
            if (!route) return res.status(404).send("No route found.");

            res.status(200).send(route);
        });
}

exports.delete = function (req, res) {
    Route.remove({
        _id: req.params.route_id, userId: req.userId
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.status(200).send({
            status: "success",
            message: 'Route deleted.'
        });
    });
}

exports.update = function (req, res) {
    Route.findById({
        _id: req.params.route_id,
        userId: req.userId
    }, function (err, route) {
        if (err)
            res.send(err);
        route.name = req.body.name ? req.body.name : route.name;
        route.scheduledStart = req.body.scheduledStart;
        route.scheduledEnd = req.body.scheduledEnd;
        route.status = req.body.status;
        route.userId = req.userId;
        // save the contact and check for errors
        route.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'route Info updated',
                data: route
            });
        });
    });
}

exports.index = function (req, res) {
    Route.find({ userId: req.userId }, { userId: 0, createdAt: 0, updatedAt: 0, __v: 0 }, function (err, routes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Routes retrieved successfully",
            data: routes
        });
    });
}