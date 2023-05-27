import React, { useState } from 'react';
import PostList from '../components/PostList';
import BoardList from '../components/BoardList';
import Login from '../components/Login';
import { useParams } from 'react-router-dom';

function Home(props) {
  const [boardId, setBoardId] = useState(useParams().boardId);
  return (
    <div>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <BoardList setBoardId={setBoardId} />
          </div>
          <div className="col-sm-8">
            <PostList boardId={boardId} />
          </div>
          <div className="col-sm-2">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
