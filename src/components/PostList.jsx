import React, { useState } from 'react';
import Post from './Post';

function PostList(props) {
  const { boardId, isProfile, isSearch } = props;
  const [postList, setPostList] = useState([1, 2, 3, 4]);
  const [isRecmd, setIsRecmd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
          <tbody>
            {postList.map((post) => (
              <Post key={post} post={post} />
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link">처음</button>
              </li>
              <li className="page-item">
                <button className="page-link">이전</button>
              </li>
            </ul>
            <li key={1} className="page-item active">
              <button key={1} className="page-link">
                {1}
              </button>
            </li>
            <li key={2} className="page-item">
              <button key={2} className="page-link">
                {2}
              </button>
            </li>
            <li key={3} className="page-item">
              <button key={3} className="page-link">
                {3}
              </button>
            </li>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link">다음</button>
              </li>
              <li className="page-item">
                <button className="page-link">마지막</button>
              </li>
            </ul>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PostList;
