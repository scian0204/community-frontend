import React, { useEffect, useState } from 'react';
import Post from './Post';
import Request from '../Request';

function PostList(props) {
  const { boardId, isProfile, isSearch } = props;
  const [postList, setPostList] = useState([]);
  const [isRecmd, setIsRecmd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    if (boardId == null) {
      Request.get(
        `http://localhost:8080/api/post/list?page=${currentPage - 1}&size=10`
      ).then((res) => {
        setPostList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    } else {
      Request.get(
        `http://localhost:8080/api/post/list/${boardId}?page=${
          currentPage - 1
        }&size=10`
      ).then((res) => {
        setPostList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    }
  }, [currentPage, boardId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [boardId]);

  const numberToArray = (num) => {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  };

  const toFirst = () => {
    setCurrentPage(1);
  };

  const toPrePage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toPage = (e) => {
    setCurrentPage(e.target.innerText);
  };

  const toNextPage = () => {
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const toLast = () => {
    setCurrentPage(totalPage);
  };

  return (
    <div>
      <div id="bdr" style={{ border: '1px solid blue', padding: '10px' }}>
        {!(isProfile || isSearch) ? (
          <div id="btns">
            {!isRecmd ? (
              <div>
                <button className="btn btn-primary">일반글</button>
                <button onClick={null} className="btn btn-outline-success">
                  인기글
                </button>
                <div className="float-right">
                  <button className="btn btn-secondary">글쓰기</button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={null} className="btn btn-outline-primary">
                  일반글
                </button>
                <button className="btn btn-success">인기글</button>
                <div className="float-right">
                  <button className="btn btn-secondary">글쓰기</button>
                </div>
              </div>
            )}
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
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {isFirst ? (
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <button className="page-link">처음</button>
                </li>
                <li className="page-item disabled">
                  <button className="page-link">이전</button>
                </li>
              </ul>
            ) : (
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button onClick={toFirst} className="page-link">
                    처음
                  </button>
                </li>
                <li className="page-item">
                  <button onClick={toPrePage} className="page-link">
                    이전
                  </button>
                </li>
              </ul>
            )}
            {numberToArray(totalPage).map((i) => (
              <div key={i}>
                {currentPage == i ? (
                  <li key={i} className="page-item active">
                    <button key={i} className="page-link">
                      {i}
                    </button>
                  </li>
                ) : (
                  <li key={i} className="page-item">
                    <button onClick={toPage} key={i} className="page-link">
                      {i}
                    </button>
                  </li>
                )}
              </div>
            ))}
            {isLast ? (
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <button className="page-link">다음</button>
                </li>
                <li className="page-item disabled">
                  <button className="page-link">마지막</button>
                </li>
              </ul>
            ) : (
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button onClick={toNextPage} className="page-link">
                    다음
                  </button>
                </li>
                <li className="page-item">
                  <button onClick={toLast} className="page-link">
                    마지막
                  </button>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PostList;
