import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileAction';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with
          developers
        </p>
        <div className='profiles'>
          {profiles.length > 0 ? (
            profiles.map(profile => {
              return <ProfileItem key={profile._id} profile={profile} />;
            })
          ) : (
            <h4>No profiles found</h4>
          )}
        </div>
      </section>
    );
  }
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
