let router = require('express').Router();
let verifyToken = require('../middleware/verifyToken');
let userController = require('../controller/userController');
let authController = require('../controller/authController')

router.route('/me')
    .get(verifyToken, userController.view)
    .patch(verifyToken, userController.update)
    .put(verifyToken, userController.update);

router.route('/register')
    .post(authController.new);

router.route('/login')
    .post(authController.login);
    
// Export API routes
module.exports = router;