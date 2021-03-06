import React from 'react';
import { formatDate } from '../../utils/helpers';

const ProfileEducation = ({
  school,
  degree,
  fieldofstudy,
  current,
  to,
  from,
  description,
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {formatDate(from)} - {!to ? 'Now' : formatDate(to)}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
