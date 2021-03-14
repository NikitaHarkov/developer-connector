const { body } = require('express-validator');
const auth = require('../../middleware/auth');

const {
  getAuthenticatedUser,
  authenticateUser,
} = require('../../controllers/authController');

const authRoute = (url, app) => {
  app
    .route(`${url}/`)
    .get(auth, getAuthenticatedUser)
    .post(
      [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
      ],
      authenticateUser
    );
};

module.exports = authRoute;
