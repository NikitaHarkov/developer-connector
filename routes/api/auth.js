const { body } = require('express-validator');
const auth = require('../../middleware/auth');

const {
  getAuthenticatedUser,
  authenticateUser,
} = require('../../controllers/authController');

const authRoute = (url, app) => {
  // @route  GET api/auth
  // @desc   Get authenticated user
  // @access Public
  app
    .route(`${url}/`)
    .get(auth, getAuthenticatedUser)

    // @route  POST api/auth
    // @desc   Authenticate user & get token
    // @access Public
    .post(
      [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
      ],
      authenticateUser
    );
};

module.exports = authRoute;
