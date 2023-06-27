import React, { useContext } from 'react';
import Request from '../Request';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function RightMenu(props) {
  const { userData, setUserData, isAdmin, setIsAdmin } = useContext(UserContext);
  const nav = useNavigate();


  const logout = () => {
    Request.get('http://localhost:8080/api/user/logout').then((res) => {
      setIsAdmin(false);
      setUserData(null);
    });
  };

  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <h2>Hello {userData}!</h2>
      <Link to={`/Profile/${userData}`}>
        <button className="btn btn-primary">프로필</button>
      </Link>
      <button onClick={logout} className="btn btn-warning">
        로그아웃
      </button>
      { isAdmin &&
        <button className='btn btn-info' onClick={()=>{nav('/BoardApprove')}}>게시판신청 현황</button>
      }
    </div>
  );
}

export default RightMenu;
