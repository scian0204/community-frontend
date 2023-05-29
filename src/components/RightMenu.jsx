import React, { useContext } from 'react';
import Request from '../Request';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

function RightMenu(props) {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    Request.get('http://localhost:8080/api/user/logout').then((res) => {
      setUserData(null);
    });
  };

  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <Link to={`/Profile/${userData}`}>
        <button className="btn btn-primary">프로필</button>
      </Link>
      <button onClick={logout} className="btn btn-warning">
        로그아웃
      </button>
    </div>
  );
}

export default RightMenu;
