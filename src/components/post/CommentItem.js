import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
import { deleteComment } from '../../actions/postAction';

const CommentItem = ({
  auth,
  deleteComment,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {formatDate(date)}</p>
      </div>
      {!auth.loading && user === auth.user._id && (
        <button
          type='button'
          onClick={() => {
            deleteComment(postId, _id);
          }}
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
