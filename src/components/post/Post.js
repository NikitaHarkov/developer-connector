import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/postAction';

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading || post === null) {
    return <Loading />;
  } else {
    return (
      <>
        <Link to='/posts' classname='btn'>
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
      </>
    );
  }
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPost })(Post);
