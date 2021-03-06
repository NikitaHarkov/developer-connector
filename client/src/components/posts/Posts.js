import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import Loading from '../layout/Loading';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community
        </p>
        <PostForm />
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </>
    );
  }
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPosts })(Posts);
