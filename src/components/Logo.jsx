import React from 'react';
import { Link } from 'react-router-dom';

function Logo(props) {
  return (
    <div className="logo">
      <Link
        style={{ textDecoration: 'none' }}
        to={{
          pathname: '/',
        }}
        replace>
        <h1 style={{ textAlign: 'center' }}>Community</h1>
      </Link>
    </div>
  );
}

export default Logo;
