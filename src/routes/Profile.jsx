import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Gboard from '../components/Gboard';
import BoardShow from './BoardShow';
import PostList from '../components/PostList';
import CmtList from './../components/CmtList';
import Request from '../Request';

function Profile(props) {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [pMode, setPMode] = useState('board');
  const nav = useNavigate();

  const circleStyle = {
    width: '150px',
    height: '150px',
    WebkitBorderRadius: '700px',
    MozBorderRadius: '700px',
    borderRadius: '700px',
    backgroundColor: 'gray',
  };

  useEffect(() => {
    Request(
      {
        method: 'get',
        query: `user/${userId}`,
      },
      (res) => {
        if (res.data.error == null) {
          setUserInfo(res.data.data);
        } else {
          alert(res.data.error.message);
        }
      }
    );
  }, [userId]);

  return (
    <div className="jumbotron">
      <div className="float-left">
        <div style={circleStyle}> </div>
      </div>
      <div className="float-right">
        <button
          onClick={() => {
            nav(-1);
          }}
          className="btn btn-primary">
          이전
        </button>
      </div>
      <br />
      <h2 className="display-4">&nbsp;{userInfo.userName}</h2>
      <footer className="blockquote-footer">
        가입일 : {new Date(parseInt(userInfo.regDate)).toLocaleDateString()}
      </footer>
      <br />
      <br />
      <br />
      <hr className="my-4" />
      <div className="card text-left">
        <div className="card-header">
          <div>
            <ul className="nav nav-tabs card-header-tabs">
              <li onClick={() => setPMode('board')} className={`nav-item`}>
                <span
                  className={`nav-link ${pMode == 'board' ? 'active' : ''}`}>
                  게시판
                </span>
              </li>
              <li onClick={() => setPMode('post')} className={`nav-item`}>
                <span className={`nav-link ${pMode == 'post' ? 'active' : ''}`}>
                  게시글
                </span>
              </li>
              <li onClick={() => setPMode('cmt')} className={`nav-item`}>
                <span className={`nav-link ${pMode == 'cmt' ? 'active' : ''}`}>
                  댓글
                </span>
              </li>
              <li onClick={() => setPMode('gboard')} className={`nav-item`}>
                <span
                  className={`nav-link ${pMode == 'gboard' ? 'active' : ''}`}>
                  방명록
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          {pMode == 'board' ? (
            <BoardShow userId={userId} />
          ) : pMode == 'post' ? (
            <PostList userId={userId} />
          ) : pMode == 'cmt' ? (
            <CmtList userId={userId} />
          ) : (
            pMode == 'gboard' && <Gboard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
