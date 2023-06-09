import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Paging from './Paging';
import Request from '../Request';

function PostList(props) {
  const { boardId } = props;
  const [isSearch, setIsSearch] = useState(props.query != null);
  const [isProfile, setIsProfile] = useState(props.userId != null);
  const [postList, setPostList] = useState([]);
  const [isRecmd, setIsRecmd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState([]);

  const nav = useNavigate();

  const { userData } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(false);

    if (isProfile) {
      const { userId } = props;

      Request(
        {
          method: 'get',
          query: `post/listByUser/${userId}?page=${currentPage - 1}&size=10`,
        },
        (res) => {
          if (res.data.error == null) {
            setPostList(res.data.data.content);
            setIsFirst(res.data.data.first);
            setIsLast(res.data.data.last);
            setTotalPage(res.data.data.totalPages);
            setIsLoading(true);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    } else if (isSearch) {
      const { query } = props;

      Request(
        {
          method: 'get',
          query: `post/listByLike/${query}?page=${currentPage - 1}&size=10`,
        },
        (res) => {
          if (res.data.error == null) {
            setPostList(res.data.data.content);
            setIsFirst(res.data.data.first);
            setIsLast(res.data.data.last);
            setTotalPage(res.data.data.totalPages);
            setIsLoading(true);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    } else if (boardId == null) {
      Request(
        {
          method: 'get',
          query: `post/${isRecmd ? 'recmdList' : 'list'}?page=${
            currentPage - 1
          }&size=10`,
        },
        (res) => {
          setPostList(res.data.data.content);
          setIsFirst(res.data.data.first);
          setIsLast(res.data.data.last);
          setTotalPage(res.data.data.totalPages);
          setIsLoading(true);
        }
      );
    } else {
      Request(
        {
          method: 'get',
          query: `post/${isRecmd ? 'recmdList' : 'list'}/${boardId}?page=${
            currentPage - 1
          }&size=10`,
        },
        (res) => {
          if (res.data.error == null) {
            setPostList(res.data.data.content);
            setIsFirst(res.data.data.first);
            setIsLast(res.data.data.last);
            setTotalPage(res.data.data.totalPages);
            setIsLoading(true);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    }
  }, [currentPage, boardId, isRecmd]);

  useEffect(() => {
    setCurrentPage(1);
  }, [boardId]);

  const toggleRecmd = () => {
    setCurrentPage(1);
    setIsRecmd((preIsRecmd) => !preIsRecmd);
  };

  return (
    <div>
      <div id="bdr" style={{ border: '1px solid blue', padding: '10px' }}>
        {!(isProfile || isSearch) ? (
          <div id="btns">
            <div>
              <button
                onClick={toggleRecmd}
                className={`btn btn-${isRecmd ? 'outline-' : ''}primary`}>
                일반글
              </button>
              <button
                onClick={toggleRecmd}
                className={`btn btn-${!isRecmd ? 'outline-' : ''}success`}>
                인기글
              </button>
              <div className="float-right">
                {userData != null && boardId != null && (
                  <button
                    onClick={() => nav(`/PostForm/${boardId}`)}
                    className="btn btn-secondary">
                    글쓰기
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">등록일</th>
              <th scope="col">조회수</th>
              <th scope="col">추천수</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              {postList.map((post) => (
                <Post key={post.postId} post={post} />
              ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
        <Paging
          isFirst={isFirst}
          totalPage={totalPage}
          currentPage={currentPage}
          isLast={isLast}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default PostList;
