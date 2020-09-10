const { v4: uuid } = require('uuid');
const Route = require('../model/routeModel');

exports.new = async(req, res) => {
  Route.create({
    _id: uuid(),
    userId: req.userId,
    name: req.body.name,
    scheduledStart: req.body.scheduledStart,
    scheduledEnd: req.body.scheduledEnd,
    status: req.body.status,
  },
  (err) => {
    if (err) {
      return res.status(500).send('There was a problem adding a new route.');
    }
    return res.status(200).send({ status: 'Success', message: 'Route successfully created.' });
  });
};

exports.view = async(req, res) => {
  Route.findById({
    _id: req.params.route_id,
    userId: req.userId,
  },
  {
    userId: 0, createdAt: 0, updatedAt: 0, __v: 0,
  },
  (err, route) => {
    if (err) return res.status(500).send('There was a problem finding the route.');
    if (!route) return res.status(404).send('No route found.');

    return res.status(200).send(route);
  }).lean();
};

exports.delete = async (req, res) => {
  Route.remove({
    _id: req.params.route_id, userId: req.userId,
  }, (err) => {
    if (err) res.send(err);
    return res.status(200).send({
      status: 'success',
      message: 'Route deleted.',
    });
  });
};

exports.update = function updateRoute(req, res) {
  Route.findOneAndUpdate({
    _id: req.params.route_id,
    userId: req.userId,
  }, res.body, { runValidators: true, new: true })
    .exec()
    .then((route) => {
      if (route === null) {
        res.json({
          message: 'route Info updated',
          data: route,
        });
      }
      res.json({
        message: 'route Info updated',
        data: route,
      });
    });
};

exports.index = function viewAllRoute(req, res) {
  Route.find({ userId: req.userId }, {
    userId: 0, createdAt: 0, updatedAt: 0, __v: 0,
  }, (err, routes) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Routes retrieved successfully',
      data: routes,
    });
  }).lean();
};
