import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';

function BoardList(props) {
  const [boardList, setBoardList] = useState([1, 2, 3, 4]);

  return (
    <div>
      <div style={{ border: '1px solid blue', padding: '10px' }}>
        <div className="list-group">
          <Link to={{ pathname: '/BoardShow' }}>
            <button className="list-group-item list-group-item-action">
              게시판 전체 보기
            </button>
          </Link>
          {false ? (
            <Link to={{ pathname: '/Form' }}>
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
        <hr />
        <div className="list-group">
          {boardList.map((board) => (
            <Board key={board} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardList;
