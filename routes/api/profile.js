const auth = require('../../middleware/auth');
const { body } = require('express-validator');

const {
  getUserProfile,
  createUserProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfileAndUser,
  addProfileExperience,
  deleteExperienceFromProfile,
  addProfileEducation,
  deleteEducationFromProfile,
  getGithubRepos,
} = require('../../controllers/profileController');

const profileRoute = (url, app) => {
  app.route(`${url}/me`).get(auth, getUserProfile);
  app.route(`${url}/user/:user_id`).get(getProfileByUserId);

  app
    .route(`${url}/`)
    .post(
      [
        auth,
        [
          body('status', 'Status is required').not().isEmpty(),
          body('skills', 'Skills is required').not().isEmpty(),
        ],
      ],
      createUserProfile
    )
    .get(getAllProfiles)
    .delete(auth, deleteProfileAndUser);

  app
    .route(`${url}/experience`)
    .put(
      [
        auth,
        [
          body('title', 'Title is required').not().isEmpty(),
          body('company', 'Company is required').not().isEmpty(),
          body('from', 'From date is required').not().isEmpty(),
        ],
      ],
      addProfileExperience
    );

  app
    .route(`${url}/experience/:exp_id`)
    .delete(auth, deleteExperienceFromProfile);

  app
    .route(`${url}/education`)
    .put(
      [
        auth,
        [
          body('school', 'School is required').not().isEmpty(),
          body('degree', 'Degree is required').not().isEmpty(),
          body('fieldofstudy', 'Field of Study is required').not().isEmpty(),
          body('from', 'From date is required').not().isEmpty(),
        ],
      ],
      addProfileEducation
    );

  app
    .route(`${url}/education/:edu_id`)
    .delete(auth, deleteEducationFromProfile);

  app.route(`${url}/github/:username`).get(getGithubRepos);
};

module.exports = profileRoute;
