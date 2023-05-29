import React from 'react';
import { useParams } from 'react-router-dom';

function Profile(props) {
  const userId = useParams().userId;

  return (
    <div>
      <h1>{userId}의 Profile</h1>
    </div>
  );
}

export default Profile;
