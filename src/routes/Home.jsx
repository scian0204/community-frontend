import React, { useContext, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import BoardList from '../components/BoardList';
import Login from '../components/Login';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import RightMenu from '../components/RightMenu';

function Home(props) {
  const [boardId, setBoardId] = useState(useParams().boardId);
  const param = useParams().boardId;
  const { userData } = useContext(UserContext);

  useEffect(() => {
    setBoardId(param);
  }, [useParams()]);

  return (
    <div>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <BoardList boardId={boardId} setBoardId={setBoardId} />
          </div>
          <div className="col-sm-8">
            <PostList boardId={boardId} />
          </div>
          <div className="col-sm-2">
            {userData == null ? <Login /> : <RightMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
