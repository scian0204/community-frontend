import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import UserContext from '../context/UserContext';
import Request from '../Request';

function BoardList(props) {
  const { boardId } = props;
  const { userData } = useContext(UserContext);
  const [boardList, setBoardList] = useState([]);
  const [currentBoard, setCurrentBoard] = useState();

  useEffect(() => {
    Request(
      {
        method: 'get',
        query: 'board/listByRank',
      },
      (res) => {
        setBoardList(res.data.data);
      }
    );
    if (boardId != undefined) {
      Request(
        {
          method: 'get',
          query: `board/${boardId}`,
        },
        (res) => {
          setCurrentBoard(res.data.data);
        }
      );
    } else {
      setCurrentBoard(null);
    }
  }, [boardId]);

  return (
    <div>
      <div style={{ border: '1px solid blue', padding: '10px' }}>
        <div className="list-group">
          <Link to={{ pathname: '/BoardShow' }}>
            <button className="list-group-item list-group-item-action">
              게시판 전체 보기
            </button>
          </Link>
          {userData != null ? (
            <Link to={{ pathname: '/BoardForm' }}>
              <button className="list-group-item list-group-item-action">
                게시판 요청하기
              </button>
            </Link>
          ) : (
            <button
              onClick={() => alert('로그인 후 이용 가능합니다.')}
              className="list-group-item list-group-item-action">
              게시판 요청하기
            </button>
          )}
        </div>
        {currentBoard && (
          <div>
            <hr />
            <p>현재 게시판 :</p>
            <button
              className="list-group-item list-group-item-action"
              disabled={true}>
              {currentBoard.boardName}
            </button>
          </div>
        )}
        <hr />
        <p>인기 게시판 :</p>
        <div className="list-group">
          {boardList.map((board) => (
            <Board key={board[0]} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardList;
