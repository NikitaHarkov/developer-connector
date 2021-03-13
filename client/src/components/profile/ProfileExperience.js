import React from 'react';
import { formatDate } from '../../utils/helpers';

const ProfileExperience = ({
  company,
  title,
  location,
  current,
  to,
  from,
  description,
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {formatDate(from)} - {!to ? 'Now' : formatDate(to)}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
