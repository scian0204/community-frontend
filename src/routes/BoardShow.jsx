import React, { useEffect, useState } from 'react';
import Request from '../Request';
import { Link, useNavigate } from 'react-router-dom';

function BoardShow(props) {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [isSearch, setIsSearch] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    Request.get(
      `http://localhost:8080/api/board/list?page=${currentPage - 1}&size=10`
    ).then((res) => {
      setBoardList(res.data.data.content);
      setIsFirst(res.data.data.first);
      setIsLast(res.data.data.last);
      setTotalPage(res.data.data.totalPages);
      setIsLoading(true);
    });
  }, [currentPage]);

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
        <div id="btns">
          {isSearch ? null : false ? (
            <Link to={{ pathname: '/form' }}>
              <button className="btn btn-primary">게시판 요청</button>
            </Link>
          ) : (
            <button
              onClick={() => alert('로그인 후 이용 가능합니다.')}
              className="btn btn-primary">
              게시판 요청
            </button>
          )}
          <button
            onClick={() => {
              nav(-1);
            }}
            className="btn btn-primary float-right">
            이전
          </button>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">이름</th>
              <th scope="col">만든 유저</th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((board) => {
              return (
                <tr
                  onClick={() => {
                    nav(`/${board.boardId}`);
                  }}
                  key={`tr_${board.boardId}`}>
                  <td key={`boardId_${board.boardId}`}>{board.boardId}</td>
                  <td key={`boardName_${board.boardId}`}>{board.boardName}</td>
                  <td key={`userId_${board.boardId}`}>{board.userId}</td>
                  <td key={`regDate_${board.boardId}`}>
                    {new Date(parseInt(board.regDate)).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
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

export default BoardShow;
