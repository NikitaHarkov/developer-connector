import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
//import Loading from '../layout/Loading';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <div></div>;
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPosts })(Posts);
