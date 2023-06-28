import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardShow from './BoardShow';
import PostList from '../components/PostList';
import UserList from '../components/UserList';

function Search(props) {
  const { query } = useParams();
  const [pMode, setPMode] = useState('board');

  return (
    <div className="jumbotron">
      <br />
      <h2 className="display-4">검색어 : {query}</h2>
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
              <li onClick={() => setPMode('user')} className={`nav-item`}>
                <span className={`nav-link ${pMode == 'user' ? 'active' : ''}`}>
                  유저
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          {pMode == 'board' ? (
            <BoardShow query={query} />
          ) : pMode == 'post' ? (
            <PostList query={query} />
          ) : (
            pMode == 'user' && <UserList query={query} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
