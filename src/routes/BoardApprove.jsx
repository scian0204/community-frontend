import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Paging from '../components/Paging';
import Request from '../Request';

function BoardApprove(props) {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const { isAdmin } = useContext(UserContext);
  const nav = useNavigate();
  if (!isAdmin) {
    nav('/');
  }

  useEffect(() => {
    Request(
      {
        method: 'get',
        query: `board/notAllowedList?page=${currentPage - 1}&size=10`,
      },
      (res) => {
        setBoardList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      }
    );
  }, [currentPage, useParams()]);

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

  const approveBoard = (boardId) => {
    Request(
      {
        method: 'put',
        query: `board/authorize/${boardId}`,
      },
      (res) => {
        if (res.data.error == null) {
          nav('/BoardApprove');
        } else {
          alert(res.data.error.message);
        }
      }
    );
  };

  const deleteBoard = (boardId) => {
    Request(
      {
        method: 'delete',
        query: `board/delete/${boardId}`,
      },
      (res) => {
        if (res.data.error == null) {
          nav('/BoardApprove');
        } else {
          alert(res.data.error.message);
        }
      }
    );
  };

  return (
    isLoading && (
      <div>
        <div id="bdr" style={{ border: '1px solid blue', padding: '10px' }}>
          <div id="btns">
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
                <th scope="col">허가 여부</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board) => {
                return (
                  <tr key={`tr_${board.boardId}`}>
                    <td key={`boardId_${board.boardId}`}>{board.boardId}</td>
                    <td key={`boardName_${board.boardId}`}>
                      {board.boardName}
                    </td>
                    <td key={`userId_${board.boardId}`}>{board.userId}</td>
                    <td key={`regDate_${board.boardId}`}>
                      {new Date(parseInt(board.regDate)).toLocaleDateString()}
                    </td>
                    <td key={`btns_${board.boardId}`}>
                      <button
                        onClick={() => approveBoard(board.boardId)}
                        className="btn btn-primary">
                        허가
                      </button>{' '}
                      <button
                        onClick={() => deleteBoard(board.boardId)}
                        className="btn btn-danger">
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paging
            isFirst={isFirst}
            toFirst={toFirst}
            toPrePage={toPrePage}
            totalPage={totalPage}
            currentPage={currentPage}
            toPage={toPage}
            isLast={isLast}
            toNextPage={toNextPage}
            toLast={toLast}
            numberToArray={numberToArray}
          />
        </div>
      </div>
    )
  );
}

export default BoardApprove;
