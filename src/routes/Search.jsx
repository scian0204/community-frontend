import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardShow from './BoardShow';
import PostList from '../components/PostList';
import Request from '../Request';
import UserList from '../components/UserList';

function Search(props) {
  const {query} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pMode, setPMode] = useState('board');
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    Request.get(`http://localhost:8080/api/user/listByLike/${query}?page=${0}&size=10`).then(res=>{
      if(res.data.error == null) {
        setUsers(res.data.data.content);
        setIsLoading(true);
      }else {
        alert(res.data.error.message)
      }
    });
  }, [query]);

  return (
    !isLoading ? <h1>now loading...</h1> : 
    <div className="jumbotron">
      <br /> 
      <h2 className="display-4">검색어 : {query}</h2>
      <br /><br /><br />
      <hr className="my-4" />
      <div className="card text-left">
        <div className="card-header">
          <div>
            <ul className="nav nav-tabs card-header-tabs">
              <li onClick={()=>setPMode("board")} className={`nav-item`}><span className={`nav-link ${pMode=="board" ? "active" : ""}`}>게시판</span></li>
              <li onClick={()=>setPMode("post")} className={`nav-item`}><span className={`nav-link ${pMode=="post" ? "active" : ""}`}>게시글</span></li>
              <li onClick={()=>setPMode("user")} className={`nav-item`}><span className={`nav-link ${pMode=="user" ? "active" : ""}`}>유저</span></li>
            </ul>
          </div>
        </div>
        <div className="card-body">
            {pMode == 'board' ?
              <BoardShow query={query} />
            : 
            pMode == 'post' ?
              <PostList query={query}/>
            : 
            pMode == 'user' &&
              <UserList users={users} />
            }
        </div>
      </div>
    </div>
  );
}

export default Search;
