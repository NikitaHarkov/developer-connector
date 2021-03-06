const { body } = require('express-validator');
const auth = require('../../middleware/auth');
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
} = require('../../controllers/postController');

const postRoute = (url, app) => {
  app.route(`${url}/:id`).get(auth, getPostById).delete(auth, deletePostById);
  app.route(`${url}/like/:id`).put(auth, likePost);
  app.route(`${url}/unlike/:id`).put(auth, unlikePost);
  app.route(`${url}/comment/:id/:comment_id`).delete(auth, deleteComment);
  app
    .route(`${url}/`)
    .post(
      [auth, [body('text', 'Text is required').not().isEmpty()]],
      createPost
    )
    .get(auth, getAllPosts);

  app
    .route(`${url}/comment/:id`)
    .post(
      [auth, [body('text', 'Text is required').not().isEmpty()]],
      commentPost
    );
};

module.exports = postRoute;
