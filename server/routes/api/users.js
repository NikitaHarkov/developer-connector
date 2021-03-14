const { body } = require('express-validator');
const { registerUser } = require('../../controllers/userController');

const userRoute = (url, app) => {
  // @route  POST api/users
  // @desc   Register user route
  // @access Public
  app
    .route(`${url}/`)
    .post(
      [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body(
          'password',
          'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
      ],
      registerUser
    );
};

module.exports = userRoute;
