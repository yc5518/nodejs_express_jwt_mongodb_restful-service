const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const routeController = require('../controller/routeController');

const swaggerDocument = YAML.load('./swagger.yaml');
// const swaggerDocument = require('../swagger.json');

// Dynamically set the host
router.use('/api-docs', (req, res, next) => {
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup());

// APIs that do NOT require authentication
router.route('/account/register')
  .post(authController.new);

router.route('/account/login')
  .post(authController.login);

// APIs that require authentication
router.route('/account/profile')
  .get(verifyToken, userController.view)
  .patch(verifyToken, userController.update)
  .put(verifyToken, userController.update);

router.route('/route')
  .post(verifyToken, routeController.new)
  .get(verifyToken, routeController.index);

router.route('/route/:route_id')
  .put(verifyToken, routeController.update)
  .get(verifyToken, routeController.view)
  .delete(verifyToken, routeController.delete);

// Export API routes
module.exports = router;
