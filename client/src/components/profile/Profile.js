import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { getProfileById } from '../../actions/profileAction';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (profile === null || loading) {
    return <Loading />;
  } else if (profile !== null) {
    return (
      <>
        <Link to='/profiles' className='btn btn-light'>
          Back To Profiles
        </Link>
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
      </>
    );
  }
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
