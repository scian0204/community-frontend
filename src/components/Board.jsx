import React from 'react';
import { Link } from 'react-router-dom';

function Board(props) {
  const { board } = props;

  return (
    <Link
      to={{
        pathname: `/${board[0]}`,
      }}>
      <button key={board[0]} className="list-group-item list-group-item-action">
        {board[1]}
        <span className="float-right">{board[2]}</span>
      </button>
    </Link>
  );
}

export default Board;
